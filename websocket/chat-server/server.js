const { WebSocketServer, WebSocket } = require('ws');
const wss = new WebSocketServer({ port: 8080 });
console.log('=== Servidor de Chat WebSocket ===');
console.log('Ouvindo na porta 8080');
console.log('Heartbeat: 30s | Rate limit: 10 msg/s');
wss.on('connection', (ws) => {
    ws.isAlive = true;
    // Rate limit: contador de mensagens por segundo
    ws.messageCount = 0;
    ws.messageTimer = setInterval(() => {
        ws.messageCount = 0;
    }, 1000);
    // Heartbeat: marca como viva ao receber pong
    ws.on('pong', () => {
        ws.isAlive = true;
    });
    // Boas-vindas
    ws.send('Bem-vindo ao chat WebSocket!');
    broadcast(`🔵 Um novo usuário entrou. (${wss.clients.size} conectados)`, ws);
    ws.on('message', (data) => {
        // Rate limit
        ws.messageCount++;
        if (ws.messageCount > 10) {
            ws.send('⚠️ Limite de 10 mensagens por segundo. Aguarde.');
            return;
        }
        const mensagem = data.toString();
        console.log(`[${new Date().toISOString()}] Mensagem: ${mensagem}`);
        // Broadcast para todos
        broadcast(`💬 ${mensagem}`);
    });
    ws.on('close', (code, reason) => {
        console.log(`Cliente desconectado. Código: ${code}`);
        // Cleanup do rate limit
        if (ws.messageTimer) {
            clearInterval(ws.messageTimer);
        }
        broadcast(`🔴 Um usuário saiu. (${wss.clients.size} restantes)`);
    });
    ws.on('error', (err) => {
        console.error('Erro na conexão:', err.message);
    });
});
// Heartbeat global
const heartbeatInterval = setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
            console.log('🧟 Conexão zumbi removida');
            return ws.terminate();
        }
        ws.isAlive = false;
        ws.ping();
    });
}, 30000);
wss.on('close', () => {
    clearInterval(heartbeatInterval);
});
// Função de broadcast
function broadcast(mensagem, excluir = null) {
    wss.clients.forEach((client) => {
        if (client !== excluir && client.readyState === WebSocket.OPEN) {
            client.send(mensagem);
        }
    });
}
console.log('Servidor pronto para conexões.');