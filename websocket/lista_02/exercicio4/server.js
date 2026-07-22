// Com base na biblioteca ws para Node.js, complete as lacunas no código abaixo para que seu servidor escute novas conexões na porta 8080 e apenas responda (eco) com a mesma mensagem de texto enviada pelo cliente:

const { WebSocketServer } = require('ws');

// 1. Crie o servidor WebSocket ouvindo na porta 8080
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Cliente conectado!');

    // 2. Registre o evento para escutar as mensagens recebidas
    ws.on('message', (data) => {
        const mensagem = data.toString();
        console.log('Recebido:', mensagem);

        // 3. Envie a mensagem recebida de volta para o cliente
        ws.send(mensagem);
    });
});