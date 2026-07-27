const messages = document.querySelector('#messages');
const emptyState = document.querySelector('#empty-state');
const form = document.querySelector('#message-form');
const input = document.querySelector('#message-input');
const sendButton = document.querySelector('#send-button');
const status = document.querySelector('#status');
const statusText = document.querySelector('#status-text');

const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const socket = new WebSocket(`${protocol}://${window.location.host}/chat`);

function addMessage(text) {
  emptyState?.remove();

  const item = document.createElement('div');
  item.className = / entrou$| saiu$/.test(text) ? 'message system' : 'message';
  item.textContent = text;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
}

socket.addEventListener('open', () => {
  statusText.textContent = 'Conectado';
  status.classList.remove('offline');
  sendButton.disabled = false;
  input.focus();
});

socket.addEventListener('message', (event) => {
  addMessage(event.data);
});

socket.addEventListener('close', () => {
  statusText.textContent = 'Desconectado';
  status.classList.add('offline');
  sendButton.disabled = true;
  addMessage('A conexão com o servidor foi encerrada.');
});

socket.addEventListener('error', () => {
  statusText.textContent = 'Erro de conexão';
  status.classList.add('offline');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text || socket.readyState !== WebSocket.OPEN) return;

  socket.send(text);
  input.value = '';
  input.focus();
});
