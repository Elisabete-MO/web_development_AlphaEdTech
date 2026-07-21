// Construa um servidor de chat completo com: 
// 1. Heartbeat a cada 15 segundos (intervalo mais agressivo) 
// 2. Rate limit: máximo 5 mensagens por segundo por cliente; se exceder 3 vezes, fecha a conexão 
// 3. Log de todas as mensagens em um arquivo chat.log no formato [timestamp] apelido: mensagem 
// 4. Reconexão automática no cliente com backoff (1s, 2s, 4s, 8s, max 30s) 
// 5. Tratamento de todos os eventos: open, message, close (com código), error

const { WebSocketServer, WebSocket } = require('ws');
const fs = require('fs');
const wss = new WebSocketServer({ port: 8080 });
const logStream = fs.createWriteStream('chat.log', { flags: 'a' });
let contador = 0;
function log(mensagem) {
    const linha = `[${new Date().toISOString()}] ${mensagem}\n`;
    logStream.write(linha);
    console.log(linha.trim());
}
function broadcast(data, excluir = null) {
    wss.clients.forEach((client) => {
        if (client !== excluir && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}
wss.on('connection', (ws) => {
    contador++;
    const apelido = `User-${contador}`;
    ws.isAlive = true;
    ws.apelido = apelido;
    ws.msgCount = 0;
    ws.warnings = 0;
    // Rate limit: reseta contagem a cada segundo
    const rateTimer = setInterval(() => { ws.msgCount = 0; }, 1000);
    ws.on('pong', () => { ws.isAlive = true; });
    log(`${apelido} conectou (${wss.clients.size} total)`);
    ws.send(`Bem-vindo! Seu apelido: ${apelido}`);
    broadcast(`🔵 ${apelido} entrou.`, ws);
    ws.on('message', (data) => {
        const texto = data.toString();
        // Rate limit check
        ws.msgCount++;
        if (ws.msgCount > 5) {
            ws.warnings++;
            if (ws.warnings >= 3) {
                ws.close(1013, 'Muitas tentativas. Conexão encerrada.');
                return;
            }
            ws.send(`⚠️ Limite excedido. Aviso ${ws.warnings}/3.`);
            return;
        }
        log(`${apelido}: ${texto}`);
        broadcast(`️ ${apelido}: ${texto}`, ws);
    });
    ws.on('close', (code, reason) => {
        clearInterval(rateTimer);
        log(`${apelido} desconectou. Código: ${code} Razão: ${reason || 'N/A'}`);
        broadcast(`🔴 ${apelido} saiu.`);
    });
    ws.on('error', (err) => {
        log(`ERRO em ${apelido}: ${err.message}`);
    });
});
// Heartbeat a cada 15 segundos
const hbTimer = setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
            log(`🧟 Zumbi removido: ${ws.apelido}`);
            return ws.terminate();
        }
        ws.isAlive = false;
        ws.ping();
    });
}, 15000);
wss.on('close', () => {
    clearInterval(hbTimer);
    logStream.end();
});
log('=== Servidor de chat robusto iniciado ===');