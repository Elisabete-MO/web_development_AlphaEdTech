const { test, describe, before, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const http = require('http');
const path = require('path');
const express = require('express');
const { WebSocketServer, WebSocket } = require('ws');
const {
  sendError,
  handleJoin,
  handleQuestionCreate,
  handleQuestionVote,
  releaseUsername,
  questions,
  usernames,
  socketUsernames
} = require('../server/index.js');

const PORT = 3555;
let server;
let wss;

function startServer() {
  return new Promise((resolve) => {
    const app = express();
    app.use(express.static(path.join(__dirname, '../public')));
    
    server = http.createServer(app);
    wss = new WebSocketServer({ server, path: '/ws' });

    wss.on('connection', (socket) => {
      socket.on('message', (data, isBinary) => {
        if (isBinary) return;
        let message;
        try {
          message = JSON.parse(data.toString());
        } catch {
          sendError(socket, 'INVALID_MESSAGE', 'JSON inválido');
          return;
        }
        if (!message || typeof message !== 'object' || !message.type) {
          sendError(socket, 'INVALID_MESSAGE', 'Mensagem deve ter type');
          return;
        }
        const { type, payload } = message;
        switch (type) {
          case 'user:join':
            handleJoin(socket, payload);
            break;
          case 'question:create':
            handleQuestionCreate(socket, payload);
            break;
          case 'question:vote':
            handleQuestionVote(socket, payload);
            break;
          default:
            sendError(socket, 'INVALID_MESSAGE', `Tipo de mensagem desconhecido: ${type}`);
        }
      });

      socket.on('close', () => releaseUsername(socket));
    });

    server.listen(PORT, () => resolve());
  });
}

function stopServer() {
  return new Promise((resolve) => {
    wss.close(() => {
      server.close(() => resolve());
    });
  });
}

function httpGet(pathStr) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${PORT}${pathStr}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

function createClientHelper(port = PORT) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://localhost:${port}/ws`);
    const queue = [];
    const listeners = [];

    ws.on('message', (data) => {
      let parsed;
      try {
        parsed = JSON.parse(data.toString());
      } catch {
        parsed = data.toString();
      }
      if (listeners.length > 0) {
        const fn = listeners.shift();
        fn(parsed);
      } else {
        queue.push(parsed);
      }
    });

    ws.on('open', () => {
      resolve({
        ws,
        send(msg) {
          ws.send(JSON.stringify(msg));
        },
        getNextMessage(timeout = 2000) {
          return new Promise((res, rej) => {
            if (queue.length > 0) {
              res(queue.shift());
              return;
            }
            const timer = setTimeout(() => {
              const idx = listeners.indexOf(onMsg);
              if (idx !== -1) listeners.splice(idx, 1);
              rej(new Error('Timeout waiting for message'));
            }, timeout);

            function onMsg(msg) {
              clearTimeout(timer);
              res(msg);
            }
            listeners.push(onMsg);
          });
        },
        close() {
          ws.close();
        }
      });
    });

    ws.on('error', reject);
  });
}

describe('Frontend HTTP Assets & E2E Multi-client Flow', () => {
  before(async () => {
    await startServer();
  });

  after(async () => {
    await stopServer();
  });

  beforeEach(() => {
    questions.clear();
    usernames.clear();
    socketUsernames.clear();
  });

  describe('HTTP Static Serving', () => {
    test('GET / responds 200 with index.html', async () => {
      const res = await httpGet('/');
      assert.strictEqual(res.statusCode, 200);
      assert.ok(res.body.includes('<title>Quiz em Tempo Real</title>'));
      assert.ok(res.body.includes('id="join-section"'));
      assert.ok(res.body.includes('id="quiz-section"'));
    });

    test('GET /styles.css responds 200 with CSS content', async () => {
      const res = await httpGet('/styles.css');
      assert.strictEqual(res.statusCode, 200);
      assert.ok(res.body.includes('--bg-color:'));
      assert.ok(res.body.includes('.question-card'));
    });

    test('GET /app.js responds 200 with JS logic', async () => {
      const res = await httpGet('/app.js');
      assert.strictEqual(res.statusCode, 200);
      assert.ok(res.body.includes('connectWebSocket'));
      assert.ok(res.body.includes('handleServerMessage'));
    });
  });

  describe('Multi-Client Real-Time Synchronization', () => {
    test('Two clients connect, join, broadcast question & votes', async () => {
      const clientA = await createClientHelper();
      const clientB = await createClientHelper();

      // Alice joins
      clientA.send({ type: 'user:join', payload: { username: 'Alice' } });
      const msgA1 = await clientA.getNextMessage();
      assert.strictEqual(msgA1.type, 'user:joined');
      assert.strictEqual(msgA1.payload.username, 'Alice');

      const msgA2 = await clientA.getNextMessage();
      assert.strictEqual(msgA2.type, 'questions:history');

      // Bob joins
      clientB.send({ type: 'user:join', payload: { username: 'Bob' } });
      const msgB1 = await clientB.getNextMessage();
      assert.strictEqual(msgB1.type, 'user:joined');
      assert.strictEqual(msgB1.payload.username, 'Bob');

      const msgB2 = await clientB.getNextMessage();
      assert.strictEqual(msgB2.type, 'questions:history');

      // Alice creates a question
      clientA.send({ type: 'question:create', payload: { text: 'O céu é azul?' } });

      const createdA = await clientA.getNextMessage();
      const createdB = await clientB.getNextMessage();

      assert.strictEqual(createdA.type, 'question:created');
      assert.strictEqual(createdB.type, 'question:created');
      assert.strictEqual(createdA.payload.question.text, 'O céu é azul?');
      assert.strictEqual(createdA.payload.question.author, 'Alice');

      const qId = createdA.payload.question.id;

      // Bob votes "yes"
      clientB.send({ type: 'question:vote', payload: { questionId: qId, answer: 'yes' } });

      const votedA = await clientA.getNextMessage();
      const votedB = await clientB.getNextMessage();

      assert.strictEqual(votedA.type, 'question:voted');
      assert.strictEqual(votedB.type, 'question:voted');
      assert.strictEqual(votedA.payload.questionId, qId);
      assert.strictEqual(votedA.payload.votes.yes, 1);
      assert.strictEqual(votedA.payload.votes.no, 0);

      clientA.close();
      clientB.close();
    });

    test('Duplicate username rejection across clients', async () => {
      const clientA = await createClientHelper();
      const clientB = await createClientHelper();

      clientA.send({ type: 'user:join', payload: { username: 'Maria' } });
      const msgA1 = await clientA.getNextMessage();
      assert.strictEqual(msgA1.type, 'user:joined');

      clientB.send({ type: 'user:join', payload: { username: 'maria' } });
      const msgB1 = await clientB.getNextMessage();
      assert.strictEqual(msgB1.type, 'error');
      assert.strictEqual(msgB1.payload.code, 'USERNAME_IN_USE');

      clientA.close();
      clientB.close();
    });
  });
});
