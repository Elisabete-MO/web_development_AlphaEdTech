// Chat com Broadcast e ReadyState Guard
// Construa um servidor de chat com broadcast que: 
// 1. Atribui um apelido automático (“Usuário-1”, “Usuário-2”, etc.) a cada cliente 
// 2. Faz broadcast apenas para conexões com readyState === OPEN 
// 3. Exclui o emissor do broadcast 
// 4. Cliente HTML com input + botão + área de scroll 
// 5. Mostra quem está digitando (enquanto digita, envia “digitando…” a cada 2s)

const { WebSocketServer, WebSocket } = require('ws');
const wss = new WebSocketServer({ port: 8080 });
let contador = 0;
function broadcast(data, excluir = null) {
    wss.clients.forEach((client) => {
        if (client !== excluir && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}
wss.on('connection', (ws) => {
    contador++;
    const apelido = `Usuário-${contador}`;
    console.log(`${apelido} conectou. Total: ${wss.clients.size}`);
    ws.send(`Seu apelido é ${apelido}`);
    broadcast(`📢 ${apelido} entrou no chat.`, ws);
    ws.on('message', (data, isBinary) => {
        if (isBinary) return;
        const texto = data.toString();
        // Evento de digitação — não faz broadcast do próprio evento
        if (texto.startsWith('/digitando')) {
            broadcast(`✏️ ${apelido} está digitando...`, ws);
            return;
        }
        const mensagem = `️ ${apelido}: ${texto}`;
        console.log(mensagem);
        broadcast(mensagem, ws);
    });
    ws.on('close', () => {
        broadcast(`👋 ${apelido} saiu do chat.`);
        console.log(`${apelido} desconectado.`);
    });
    ws.on('error', (err) => {
        console.error(`Erro em ${apelido}:`, err.message);
    });
});