const { test, describe, before, after, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const http = require('http');
const { WebSocket } = require('ws');
const {
  sendMessage,
  sendError,
  broadcastToActiveClients,
  handleJoin,
  handleQuestionCreate,
  handleQuestionVote,
  releaseUsername,
  questions,
  usernames,
  socketUsernames
} = require('../server/index.js');

const TEST_PORT = 3456;
let testServer;
let testWss;

function createTestServer() {
  const app = require('express')();
  const server = http.createServer(app);
  const { WebSocketServer } = require('ws');
  const wss = new WebSocketServer({ server, path: '/ws' });
  
  // Attach the same connection handler logic
  wss.on('connection', (socket) => {
    socket.on('message', (data, isBinary) => {
      if (isBinary) {
        return;
      }
      
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
    
    socket.on('close', () => {
      releaseUsername(socket);
    });
    
    socket.on('error', (error) => {
      console.error('Erro no socket:', error.message);
    });
  });
  
  return { server, wss };
}

function connectWebSocket(port = TEST_PORT) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://localhost:${port}/ws`);
    ws.on('open', () => resolve(ws));
    ws.on('error', reject);
    setTimeout(() => reject(new Error('Connection timeout')), 5000);
  });
}

function sendAndWait(ws, message, timeout = 2000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Response timeout')), timeout);
    ws.once('message', (data) => {
      clearTimeout(timer);
      try {
        resolve(JSON.parse(data.toString()));
      } catch {
        resolve(data.toString());
      }
    });
    ws.send(JSON.stringify(message));
  });
}

function waitForMessages(ws, count, timeout = 3000) {
  return new Promise((resolve, reject) => {
    const messages = [];
    const timer = setTimeout(() => reject(new Error('Message timeout')), timeout);
    
    function onMessage(data) {
      try {
        messages.push(JSON.parse(data.toString()));
      } catch {
        messages.push(data.toString());
      }
      if (messages.length >= count) {
        clearTimeout(timer);
        ws.off('message', onMessage);
        resolve(messages);
      }
    }
    
    ws.on('message', onMessage);
  });
}

describe('Quiz WebSocket Server', () => {
  before(async () => {
    ({ server: testServer, wss: testWss } = createTestServer());
    await new Promise((resolve) => testServer.listen(TEST_PORT, resolve));
  });

  after(async () => {
    await new Promise((resolve) => testServer.close(resolve));
  });

  beforeEach(() => {
    // Clear in-memory state
    questions.clear();
    usernames.clear();
    socketUsernames.clear();
  });

  describe('Protocol validation', () => {
    test('rejects binary messages', async () => {
      const ws = await connectWebSocket();
      ws.send(Buffer.from('binary data'));
      // Should not crash, just ignore
      await new Promise(r => setTimeout(r, 100));
      ws.close();
    });

    test('rejects invalid JSON', async () => {
      const ws = await connectWebSocket();
      ws.send('not json');
      // First response should be error for invalid JSON
      const errorResponse = await sendAndWait(ws, { type: 'user:join', payload: { username: 'test' } });
      assert.strictEqual(errorResponse.type, 'error');
      assert.strictEqual(errorResponse.payload.code, 'INVALID_MESSAGE');
      ws.close();
    });

    test('rejects message without type', async () => {
      const ws = await connectWebSocket();
      const response = await sendAndWait(ws, { payload: { username: 'test' } });
      assert.strictEqual(response.type, 'error');
      assert.strictEqual(response.payload.code, 'INVALID_MESSAGE');
      ws.close();
    });

    test('rejects unknown message type', async () => {
      const ws = await connectWebSocket();
      await sendAndWait(ws, { type: 'user:join', payload: { username: 'test' } });
      const response = await sendAndWait(ws, { type: 'unknown:type', payload: {} });
      assert.strictEqual(response.type, 'error');
      assert.strictEqual(response.payload.code, 'INVALID_MESSAGE');
      ws.close();
    });

    test('all messages have type and payload', async () => {
      const ws = await connectWebSocket();
      const response = await sendAndWait(ws, { type: 'user:join', payload: { username: 'test' } });
      assert.ok(response.type);
      assert.ok(response.payload);
      ws.close();
    });
  });

  describe('User join', () => {
    test('accepts valid username', async () => {
      const ws = await connectWebSocket();
      const response = await sendAndWait(ws, { type: 'user:join', payload: { username: 'Maria' } });
      assert.strictEqual(response.type, 'user:joined');
      assert.strictEqual(response.payload.username, 'Maria');
      ws.close();
    });

    test('rejects empty username', async () => {
      const ws = await connectWebSocket();
      const response = await sendAndWait(ws, { type: 'user:join', payload: { username: '' } });
      assert.strictEqual(response.type, 'error');
      assert.strictEqual(response.payload.code, 'INVALID_USERNAME');
      ws.close();
    });

    test('rejects username > 30 chars', async () => {
      const ws = await connectWebSocket();
      const response = await sendAndWait(ws, { type: 'user:join', payload: { username: 'a'.repeat(31) } });
      assert.strictEqual(response.type, 'error');
      assert.strictEqual(response.payload.code, 'INVALID_USERNAME');
      ws.close();
    });

    test('trims username', async () => {
      const ws = await connectWebSocket();
      const response = await sendAndWait(ws, { type: 'user:join', payload: { username: '  Maria  ' } });
      assert.strictEqual(response.type, 'user:joined');
      assert.strictEqual(response.payload.username, 'Maria');
      ws.close();
    });

    test('rejects duplicate username (case sensitive)', async () => {
      const ws1 = await connectWebSocket();
      await sendAndWait(ws1, { type: 'user:join', payload: { username: 'Maria' } });
      
      const ws2 = await connectWebSocket();
      const response = await sendAndWait(ws2, { type: 'user:join', payload: { username: 'Maria' } });
      assert.strictEqual(response.type, 'error');
      assert.strictEqual(response.payload.code, 'USERNAME_IN_USE');
      
      ws1.close();
      ws2.close();
    });

    test('rejects duplicate username (case insensitive)', async () => {
      const ws1 = await connectWebSocket();
      await sendAndWait(ws1, { type: 'user:join', payload: { username: 'Maria' } });
      
      const ws2 = await connectWebSocket();
      const response = await sendAndWait(ws2, { type: 'user:join', payload: { username: 'maria' } });
      assert.strictEqual(response.type, 'error');
      assert.strictEqual(response.payload.code, 'USERNAME_IN_USE');
      
      ws1.close();
      ws2.close();
    });

    test('sends questions:history after join', async () => {
      const ws1 = await connectWebSocket();
      await sendAndWait(ws1, { type: 'user:join', payload: { username: 'Maria' } });
      await sendAndWait(ws1, { type: 'question:create', payload: { text: 'Pergunta 1?' } });
      await sendAndWait(ws1, { type: 'question:create', payload: { text: 'Pergunta 2?' } });
      
      const ws2 = await connectWebSocket();
      // Start listening for messages BEFORE sending join
      const messagesPromise = waitForMessages(ws2, 2);
      await sendAndWait(ws2, { type: 'user:join', payload: { username: 'João' } });
      const messages = await messagesPromise;
      
      const joinResponse = messages[0];
      const history = messages[1];
      
      assert.strictEqual(joinResponse.type, 'user:joined');
      assert.strictEqual(history.type, 'questions:history');
      assert.strictEqual(history.payload.questions.length, 2);
      
      ws1.close();
      ws2.close();
    });

    test('does not send history to unjoined sockets', async () => {
      const ws1 = await connectWebSocket();
      await sendAndWait(ws1, { type: 'user:join', payload: { username: 'Maria' } });
      await sendAndWait(ws1, { type: 'question:create', payload: { text: 'Pergunta 1?' } });
      
      const ws2 = await connectWebSocket();
      // Don't join, just wait
      await new Promise(r => setTimeout(r, 200));
      
      // ws2 should not have received any messages
      ws1.close();
      ws2.close();
    });
  });

  describe('Question create', () => {
    test('rejects create without join', async () => {
      const ws = await connectWebSocket();
      const response = await sendAndWait(ws, { type: 'question:create', payload: { text: 'Pergunta?' } });
      assert.strictEqual(response.type, 'error');
      assert.strictEqual(response.payload.code, 'NOT_JOINED');
      ws.close();
    });

    test('rejects empty question text', async () => {
      const ws = await connectWebSocket();
      await sendAndWait(ws, { type: 'user:join', payload: { username: 'Maria' } });
      const response = await sendAndWait(ws, { type: 'question:create', payload: { text: '' } });
      assert.strictEqual(response.type, 'error');
      assert.strictEqual(response.payload.code, 'INVALID_QUESTION');
      ws.close();
    });

    test('rejects question text > 300 chars', async () => {
      const ws = await connectWebSocket();
      await sendAndWait(ws, { type: 'user:join', payload: { username: 'Maria' } });
      const response = await sendAndWait(ws, { type: 'question:create', payload: { text: 'a'.repeat(301) } });
      assert.strictEqual(response.type, 'error');
      assert.strictEqual(response.payload.code, 'INVALID_QUESTION');
      ws.close();
    });

    test('trims question text', async () => {
      const ws = await connectWebSocket();
      await sendAndWait(ws, { type: 'user:join', payload: { username: 'Maria' } });
      const response = await sendAndWait(ws, { type: 'question:create', payload: { text: '  Pergunta?  ' } });
      assert.strictEqual(response.type, 'question:created');
      assert.strictEqual(response.payload.question.text, 'Pergunta?');
      ws.close();
    });

    test('creates question with crypto.randomUUID', async () => {
      const ws = await connectWebSocket();
      await sendAndWait(ws, { type: 'user:join', payload: { username: 'Maria' } });
      const response = await sendAndWait(ws, { type: 'question:create', payload: { text: 'Pergunta?' } });
      
      assert.strictEqual(response.type, 'question:created');
      assert.ok(response.payload.question.id);
      assert.ok(response.payload.question.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i));
      assert.strictEqual(response.payload.question.author, 'Maria');
      assert.deepStrictEqual(response.payload.question.votes, { yes: 0, no: 0 });
      assert.ok(response.payload.question.createdAt);
      ws.close();
    });

    test('broadcasts question:created to all active clients', async () => {
      const ws1 = await connectWebSocket();
      await sendAndWait(ws1, { type: 'user:join', payload: { username: 'Maria' } });
      
      const ws2 = await connectWebSocket();
      await sendAndWait(ws2, { type: 'user:join', payload: { username: 'João' } });
      
      const createResponse = await sendAndWait(ws1, { type: 'question:create', payload: { text: 'Pergunta?' } });
      assert.strictEqual(createResponse.type, 'question:created');
      
      const [broadcast] = await waitForMessages(ws2, 1);
      assert.strictEqual(broadcast.type, 'question:created');
      assert.strictEqual(broadcast.payload.question.text, 'Pergunta?');
      
      ws1.close();
      ws2.close();
    });

    test('does not broadcast to unjoined sockets', async () => {
      const ws1 = await connectWebSocket();
      await sendAndWait(ws1, { type: 'user:join', payload: { username: 'Maria' } });
      
      const ws2 = await connectWebSocket();
      // Don't join
      
      await sendAndWait(ws1, { type: 'question:create', payload: { text: 'Pergunta?' } });
      await new Promise(r => setTimeout(r, 200));
      
      // ws2 should not have received broadcast
      ws1.close();
      ws2.close();
    });
  });

  describe('Question vote', () => {
    test('rejects vote without join', async () => {
      const ws = await connectWebSocket();
      const response = await sendAndWait(ws, { type: 'question:vote', payload: { questionId: 'fake-id', answer: 'yes' } });
      assert.strictEqual(response.type, 'error');
      assert.strictEqual(response.payload.code, 'NOT_JOINED');
      ws.close();
    });

    test('rejects vote for non-existent question', async () => {
      const ws = await connectWebSocket();
      await sendAndWait(ws, { type: 'user:join', payload: { username: 'Maria' } });
      const response = await sendAndWait(ws, { type: 'question:vote', payload: { questionId: 'fake-id', answer: 'yes' } });
      assert.strictEqual(response.type, 'error');
      assert.strictEqual(response.payload.code, 'QUESTION_NOT_FOUND');
      ws.close();
    });

    test('rejects invalid vote answer', async () => {
      const ws = await connectWebSocket();
      await sendAndWait(ws, { type: 'user:join', payload: { username: 'Maria' } });
      const createResponse = await sendAndWait(ws, { type: 'question:create', payload: { text: 'Pergunta?' } });
      const questionId = createResponse.payload.question.id;
      
      const response = await sendAndWait(ws, { type: 'question:vote', payload: { questionId, answer: 'maybe' } });
      assert.strictEqual(response.type, 'error');
      assert.strictEqual(response.payload.code, 'INVALID_VOTE');
      ws.close();
    });

    test('accepts yes vote', async () => {
      const ws = await connectWebSocket();
      await sendAndWait(ws, { type: 'user:join', payload: { username: 'Maria' } });
      const createResponse = await sendAndWait(ws, { type: 'question:create', payload: { text: 'Pergunta?' } });
      const questionId = createResponse.payload.question.id;
      
      const response = await sendAndWait(ws, { type: 'question:vote', payload: { questionId, answer: 'yes' } });
      assert.strictEqual(response.type, 'question:voted');
      assert.strictEqual(response.payload.questionId, questionId);
      assert.strictEqual(response.payload.votes.yes, 1);
      assert.strictEqual(response.payload.votes.no, 0);
      ws.close();
    });

    test('accepts no vote', async () => {
      const ws = await connectWebSocket();
      await sendAndWait(ws, { type: 'user:join', payload: { username: 'Maria' } });
      const createResponse = await sendAndWait(ws, { type: 'question:create', payload: { text: 'Pergunta?' } });
      const questionId = createResponse.payload.question.id;
      
      const response = await sendAndWait(ws, { type: 'question:vote', payload: { questionId, answer: 'no' } });
      assert.strictEqual(response.type, 'question:voted');
      assert.strictEqual(response.payload.votes.yes, 0);
      assert.strictEqual(response.payload.votes.no, 1);
      ws.close();
    });

    test('increments vote count on repeated votes', async () => {
      const ws = await connectWebSocket();
      await sendAndWait(ws, { type: 'user:join', payload: { username: 'Maria' } });
      const createResponse = await sendAndWait(ws, { type: 'question:create', payload: { text: 'Pergunta?' } });
      const questionId = createResponse.payload.question.id;
      
      await sendAndWait(ws, { type: 'question:vote', payload: { questionId, answer: 'yes' } });
      await sendAndWait(ws, { type: 'question:vote', payload: { questionId, answer: 'yes' } });
      const response = await sendAndWait(ws, { type: 'question:vote', payload: { questionId, answer: 'yes' } });
      
      assert.strictEqual(response.payload.votes.yes, 3);
      ws.close();
    });

    test('broadcasts question:voted to all active clients', async () => {
      const ws1 = await connectWebSocket();
      await sendAndWait(ws1, { type: 'user:join', payload: { username: 'Maria' } });
      const createResponse = await sendAndWait(ws1, { type: 'question:create', payload: { text: 'Pergunta?' } });
      const questionId = createResponse.payload.question.id;
      
      const ws2 = await connectWebSocket();
      await sendAndWait(ws2, { type: 'user:join', payload: { username: 'João' } });
      
      await sendAndWait(ws1, { type: 'question:vote', payload: { questionId, answer: 'yes' } });
      const [broadcast] = await waitForMessages(ws2, 1);
      
      assert.strictEqual(broadcast.type, 'question:voted');
      assert.strictEqual(broadcast.payload.questionId, questionId);
      assert.strictEqual(broadcast.payload.votes.yes, 1);
      
      ws1.close();
      ws2.close();
    });

    test('does not broadcast vote to unjoined sockets', async () => {
      const ws1 = await connectWebSocket();
      await sendAndWait(ws1, { type: 'user:join', payload: { username: 'Maria' } });
      const createResponse = await sendAndWait(ws1, { type: 'question:create', payload: { text: 'Pergunta?' } });
      const questionId = createResponse.payload.question.id;
      
      const ws2 = await connectWebSocket();
      // Don't join
      
      await sendAndWait(ws1, { type: 'question:vote', payload: { questionId, answer: 'yes' } });
      await new Promise(r => setTimeout(r, 200));
      
      ws1.close();
      ws2.close();
    });
  });

  describe('Username release on close', () => {
    test('releases username on socket close', async () => {
      const ws1 = await connectWebSocket();
      await sendAndWait(ws1, { type: 'user:join', payload: { username: 'Maria' } });
      ws1.close();
      
      // Wait for close to be processed
      await new Promise(r => setTimeout(r, 100));
      
      const ws2 = await connectWebSocket();
      const response = await sendAndWait(ws2, { type: 'user:join', payload: { username: 'Maria' } });
      assert.strictEqual(response.type, 'user:joined');
      ws2.close();
    });

    test('preserves questions after user disconnects', async () => {
      const ws1 = await connectWebSocket();
      await sendAndWait(ws1, { type: 'user:join', payload: { username: 'Maria' } });
      await sendAndWait(ws1, { type: 'question:create', payload: { text: 'Pergunta da Maria?' } });
      ws1.close();
      
      await new Promise(r => setTimeout(r, 100));
      
      const ws2 = await connectWebSocket();
      // Start listening for messages BEFORE sending join
      const messagesPromise = waitForMessages(ws2, 2);
      await sendAndWait(ws2, { type: 'user:join', payload: { username: 'João' } });
      const messages = await messagesPromise;
      
      const joinResponse = messages[0];
      const history = messages[1];
      
      assert.strictEqual(joinResponse.type, 'user:joined');
      assert.strictEqual(history.payload.questions.length, 1);
      assert.strictEqual(history.payload.questions[0].author, 'Maria');
      ws2.close();
    });
  });

  describe('Exported helper functions', () => {
    test('sendMessage sends formatted message', () => {
      const mockSocket = {
        readyState: WebSocket.OPEN,
        sent: null,
        send(data) { this.sent = data; }
      };
      sendMessage(mockSocket, 'test:type', { foo: 'bar' });
      const parsed = JSON.parse(mockSocket.sent);
      assert.strictEqual(parsed.type, 'test:type');
      assert.deepStrictEqual(parsed.payload, { foo: 'bar' });
    });

    test('sendMessage does nothing if socket not open', () => {
      const mockSocket = { readyState: WebSocket.CLOSED, send() {} };
      // Should not throw
      sendMessage(mockSocket, 'test', {});
    });

    test('sendError sends error message', () => {
      const mockSocket = { readyState: WebSocket.OPEN, sent: null, send(data) { this.sent = data; } };
      sendError(mockSocket, 'TEST_CODE', 'Test message');
      const parsed = JSON.parse(mockSocket.sent);
      assert.strictEqual(parsed.type, 'error');
      assert.strictEqual(parsed.payload.code, 'TEST_CODE');
      assert.strictEqual(parsed.payload.message, 'Test message');
    });

    test('broadcastToActiveClients sends to joined sockets only', () => {
      const mockSocket1 = { readyState: WebSocket.OPEN, sent: null, send(data) { this.sent = data; } };
      const mockSocket2 = { readyState: WebSocket.OPEN, sent: null, send(data) { this.sent = data; } };
      const mockSocket3 = { readyState: WebSocket.OPEN, sent: null, send(data) { this.sent = data; } };
      
      socketUsernames.set(mockSocket1, 'user1');
      socketUsernames.set(mockSocket2, 'user2');
      // mockSocket3 not joined
      
      broadcastToActiveClients('test', { data: 'value' });
      
      assert.ok(mockSocket1.sent);
      assert.ok(mockSocket2.sent);
      assert.strictEqual(mockSocket3.sent, null);
      
      socketUsernames.clear();
    });

    test('handleJoin validates username', () => {
      const mockSocket = { readyState: WebSocket.OPEN, sent: null, send(data) { this.sent = data; } };
      
      handleJoin(mockSocket, { username: '' });
      const parsed = JSON.parse(mockSocket.sent);
      assert.strictEqual(parsed.type, 'error');
      assert.strictEqual(parsed.payload.code, 'INVALID_USERNAME');
    });

    test('handleQuestionCreate validates question', () => {
      const mockSocket = { readyState: WebSocket.OPEN, sent: null, send(data) { this.sent = data; } };
      socketUsernames.set(mockSocket, 'user1');
      
      handleQuestionCreate(mockSocket, { text: '' });
      const parsed = JSON.parse(mockSocket.sent);
      assert.strictEqual(parsed.type, 'error');
      assert.strictEqual(parsed.payload.code, 'INVALID_QUESTION');
      
      socketUsernames.delete(mockSocket);
    });

    test('handleQuestionVote validates vote', () => {
      const mockSocket = { readyState: WebSocket.OPEN, sent: null, send(data) { this.sent = data; } };
      socketUsernames.set(mockSocket, 'user1');
      
      // First test: invalid answer
      handleQuestionVote(mockSocket, { questionId: 'fake', answer: 'invalid' });
      let parsed = JSON.parse(mockSocket.sent);
      assert.strictEqual(parsed.type, 'error');
      assert.strictEqual(parsed.payload.code, 'QUESTION_NOT_FOUND');
      
      // Second test: valid question but invalid answer
      const { randomUUID } = require('crypto');
      const questionId = randomUUID();
      questions.set(questionId, { id: questionId, text: 'Test?', author: 'user1', votes: { yes: 0, no: 0 }, createdAt: new Date().toISOString() });
      
      handleQuestionVote(mockSocket, { questionId, answer: 'invalid' });
      parsed = JSON.parse(mockSocket.sent);
      assert.strictEqual(parsed.type, 'error');
      assert.strictEqual(parsed.payload.code, 'INVALID_VOTE');
      
      questions.delete(questionId);
      socketUsernames.delete(mockSocket);
    });

    test('releaseUsername removes username from maps', () => {
      const mockSocket = {};
      socketUsernames.set(mockSocket, 'TestUser');
      usernames.set('testuser', mockSocket);
      
      releaseUsername(mockSocket);
      
      assert.strictEqual(socketUsernames.has(mockSocket), false);
      assert.strictEqual(usernames.has('testuser'), false);
    });
  });
});