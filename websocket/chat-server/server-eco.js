// Crie um servidor WebSocket que funciona como eco, mas com duas diferenças: 1. Envia uma mensagem de
// boas-vindas personalizada usando o nome que o cliente envia na primeira mensagem 2. Se o cliente enviar
// “sair”, o servidor fecha a conexão graciosamente com ws.close(1000, 'Até logo')

const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8080 });
console.log('Servidor eco personalizado ouvindo na porta 8080');
wss.on('connection', (ws) => {
    let nome = 'Anônimo';
    ws.on('message', (data) => {
        const texto = data.toString();
        // Primeira mensagem é o nome
        if (nome === 'Anônimo') {
            nome = texto;
            ws.send(`Olá, ${nome}! Bem-vindo ao eco server.`);
            return;
        }
        if (texto.toLowerCase() === 'sair') {
            ws.close(1000, 'Até logo');
            return;
        }
        ws.send(`[${nome}] ${texto}`);
    });
    ws.on('close', (code, reason) => {
        console.log(`${nome} desconectado. Código: ${code}`);
    });
    ws.on('error', (err) => {
        console.error('Erro:', err.message);
    });
});