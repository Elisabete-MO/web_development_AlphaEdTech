const { EventEmitter } = require('events');

class ChatEvents extends EventEmitter {
    userJoined(data) {
        this.emit('user:joined', data);
    }

    messageReceived(envelope) {
        this.emit('message:received', envelope);
    }

    userLeft(data) {
        this.emit('user:left', data);
    }
}

const chatEvents = new ChatEvents();

// OnlineTracker: mantém a quantidade de usuários conectados.
const onlineTracker = {
    onlineUsers: 0,

    handleUserJoined(data) {
        this.onlineUsers += 1;

        console.log(
            `👤 ${data.username} entrou. Usuários online: ${this.onlineUsers}`
        );
    },

    handleUserLeft(data) {
        this.onlineUsers = Math.max(0, this.onlineUsers - 1);

        console.log(
            `👋 ${data.username} saiu. Usuários online: ${this.onlineUsers}`
        );
    }
};

// MessageLogger: salva no máximo as 100 mensagens mais recentes.
const messageLogger = {
    history: [],

    handleMessage(envelope) {
        this.history.push(envelope);

        if (this.history.length > 100) {
            this.history.shift();
        }

        console.log(
            `📝 Mensagem salva no histórico. Total: ${this.history.length}`
        );
    }
};

// NotificationBell: reage apenas ao evento message:received.
function notificationBell(envelope) {
    console.log(`🔔 Nova mensagem de ${envelope.payload.username}`);
}

// Registro dos listeners fora da classe ChatEvents.
chatEvents.on('user:joined', (data) => {
    onlineTracker.handleUserJoined(data);
});

chatEvents.on('user:left', (data) => {
    onlineTracker.handleUserLeft(data);
});

chatEvents.on('message:received', (envelope) => {
    messageLogger.handleMessage(envelope);
});

chatEvents.on('message:received', notificationBell);

// Testes na sequência solicitada.
chatEvents.userJoined({
    username: 'ana',
    room: 'geral'
});

chatEvents.messageReceived({
    type: 'chat:message',
    payload: {
        username: 'ana',
        text: 'Olá, pessoal!'
    },
    id: '550e8400-e29b-41d4-a716-446655440000',
    timestamp: '2026-07-20T02:00:00.000Z'
});

chatEvents.userJoined({
    username: 'bruno',
    room: 'geral'
});

chatEvents.messageReceived({
    type: 'chat:message',
    payload: {
        username: 'bruno',
        text: 'Oi, Ana!'
    },
    id: '6f1a7b48-9b23-4f65-8b7e-3d09a886f102',
    timestamp: '2026-07-20T02:01:00.000Z'
});

chatEvents.userLeft({
    username: 'ana',
    room: 'geral'
});

console.log('\nEstado final:');
console.log(`Usuários online: ${onlineTracker.onlineUsers}`);
console.log(`Mensagens no histórico: ${messageLogger.history.length}`);
