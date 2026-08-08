const path = require('path');
const http = require('http');
const express = require('express');
const { WebSocketServer, WebSocket } = require('ws');
const { randomUUID } = require('crypto');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

app.use(express.static(path.join(__dirname, '../public')));

// In-memory state
const questions = new Map(); // questionId -> { id, text, author, votes: { yes: number, no: number }, createdAt }
const usernames = new Map(); // lowercase username -> socket
const socketUsernames = new Map(); // socket -> username

// Helper functions
function sendMessage(socket, type, payload) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type, payload }));
  }
}

function sendError(socket, code, message) {
  sendMessage(socket, 'error', { code, message });
}

function broadcastToActiveClients(type, payload) {
  const message = JSON.stringify({ type, payload });
  for (const [socket, username] of socketUsernames) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  }
}

function releaseUsername(socket) {
  const username = socketUsernames.get(socket);
  if (username) {
    usernames.delete(username.toLowerCase());
    socketUsernames.delete(socket);
  }
}

function handleJoin(socket, payload) {
  const username = payload?.username?.trim();
  
  if (!username || username.length > 30) {
    sendError(socket, 'INVALID_USERNAME', 'Username deve ter entre 1 e 30 caracteres');
    return;
  }
  
  const lowerUsername = username.toLowerCase();
  if (usernames.has(lowerUsername)) {
    sendError(socket, 'USERNAME_IN_USE', 'Username já está em uso');
    return;
  }
  
  // Register username
  usernames.set(lowerUsername, socket);
  socketUsernames.set(socket, username);
  
  // Send user:joined confirmation
  sendMessage(socket, 'user:joined', { username });
  
  // Send questions:history
  const questionsArray = Array.from(questions.values()).map(q => ({
    id: q.id,
    text: q.text,
    author: q.author,
    votes: { ...q.votes },
    createdAt: q.createdAt
  }));
  sendMessage(socket, 'questions:history', { questions: questionsArray });
}

function handleQuestionCreate(socket, payload) {
  const username = socketUsernames.get(socket);
  if (!username) {
    sendError(socket, 'NOT_JOINED', 'Cliente não entrou no quiz');
    return;
  }
  
  const text = payload?.text?.trim();
  if (!text || text.length > 300) {
    sendError(socket, 'INVALID_QUESTION', 'Texto da pergunta deve ter entre 1 e 300 caracteres');
    return;
  }
  
  const questionId = randomUUID();
  const createdAt = new Date().toISOString();
  const question = {
    id: questionId,
    text,
    author: username,
    votes: { yes: 0, no: 0 },
    createdAt
  };
  
  questions.set(questionId, question);
  
  // Broadcast to all active clients
  broadcastToActiveClients('question:created', { question });
}

function handleQuestionVote(socket, payload) {
  const username = socketUsernames.get(socket);
  if (!username) {
    sendError(socket, 'NOT_JOINED', 'Cliente não entrou no quiz');
    return;
  }
  
  const questionId = payload?.questionId;
  const answer = payload?.answer;
  
  if (!questionId || !questions.has(questionId)) {
    sendError(socket, 'QUESTION_NOT_FOUND', 'Pergunta não encontrada');
    return;
  }
  
  if (answer !== 'yes' && answer !== 'no') {
    sendError(socket, 'INVALID_VOTE', 'Resposta deve ser "yes" ou "no"');
    return;
  }
  
  const question = questions.get(questionId);
  question.votes[answer]++;
  
  // Broadcast to all active clients
  broadcastToActiveClients('question:voted', {
    questionId,
    votes: { ...question.votes }
  });
}

// WebSocket connection handling
wss.on('connection', (socket) => {
  console.log('Nova conexão WebSocket');
  
  socket.on('message', (data, isBinary) => {
    if (isBinary) {
      return; // Silently ignore binary messages
    }
    
    let message;
    try {
      message = JSON.parse(data.toString());
    } catch {
      sendError(socket, 'INVALID_MESSAGE', 'JSON inválido');
      return;
    }
    
    // Validate message structure
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
    const username = socketUsernames.get(socket);
    if (username) {
      console.log(`${username} desconectou`);
    }
    releaseUsername(socket);
  });
  
  socket.on('error', (error) => {
    console.error('Erro no socket:', error.message);
  });
});

// Export testable helpers
module.exports = {
  server,
  wss,
  sendMessage,
  sendError,
  broadcastToActiveClients,
  handleJoin,
  handleQuestionCreate,
  handleQuestionVote,
  releaseUsername,
  questions,
  usernames,
  socketUsernames,
  PORT
};

// Start server only when run directly (not when required as module)
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Servidor disponível em http://localhost:${PORT}`);
    console.log(`WebSocket disponível em ws://localhost:${PORT}/ws`);
  });
}