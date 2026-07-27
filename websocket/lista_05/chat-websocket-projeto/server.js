const path = require('path');
const http = require('http');
const express = require('express');
const { WebSocketServer, WebSocket } = require('ws');
const {
  uniqueNamesGenerator,
  adjectives,
  animals,
} = require('unique-names-generator');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/chat' });

app.use(express.static(path.join(__dirname, 'public')));

// Lista global dos sockets atualmente conectados.
const clients = new Set();

function createUniqueUsername() {
  let username;
  const usedNames = new Set([...clients].map((client) => client.username));

  do {
    username = uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      separator: '-',
      length: 2,
      style: 'lowerCase',
    });
  } while (usedNames.has(username));

  return username;
}

function broadcast(message, excludedSocket = null) {
  for (const client of clients) {
    if (client !== excludedSocket && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

wss.on('connection', (socket) => {
  socket.username = createUniqueUsername();
  clients.add(socket);

  console.log(`${socket.username} conectou. Total: ${clients.size}`);
  broadcast(`${socket.username} entrou`, socket);

  socket.on('message', (data, isBinary) => {
    if (isBinary) return;

    const text = data.toString().trim();
    if (!text) return;

    const formattedMessage = `${socket.username}: ${text}`;
    console.log(formattedMessage);
    broadcast(formattedMessage);
  });

  socket.on('close', () => {
    clients.delete(socket);
    console.log(`${socket.username} saiu. Total: ${clients.size}`);
    broadcast(`${socket.username} saiu`);
  });

  socket.on('error', (error) => {
    console.error(`Erro no socket de ${socket.username}:`, error.message);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor disponível em http://localhost:${PORT}`);
  console.log(`WebSocket disponível em ws://localhost:${PORT}/chat`);
});
