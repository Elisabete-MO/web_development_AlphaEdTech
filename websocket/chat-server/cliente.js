const { WebSocketServer, WebSocket } = require('ws');
const wss = new WebSocketServer({ port: 8080 });
console.log('Servidor de chat com heartbeat ouvindo na porta 8080');
wss.on('connection', (ws) => {
    ws.isAlive = true;
    console.log('Novo cliente conectado. Total:', wss.clients.size);
    ws.on('pong', () => {
        ws.isAlive = true;
    });
    ws.on('message', (data) => {
        const mensagem = data.toString();
        console.log('Mensagem recebida:', mensagem);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Usuário: ${mensagem}`);
            }
        });
    });
    ws.on('close', () => {
        console.log('Cliente desconectado. Restam:', wss.clients.size);
    });
    ws.on('error', (err) => {
        console.error('Erro na conexão:', err.message);
    });
});
// Heartbeat a cada 30 segundos
const heartbeatInterval = setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
            console.log('Conexão zumbi detectada e removida');
            return ws.terminate();
        }
        ws.isAlive = false;
        ws.ping();
    });
}, 30000);
// Limpa o intervalo quando o servidor for fechado
wss.on('close', () => {
    clearInterval(heartbeatInterval);
});
console.log('Heartbeat configurado a cada 30 segundos');