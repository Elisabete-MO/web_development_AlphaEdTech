O ws é a biblioteca WebSocket mais popular para Node.js, leve e sem
dependências externas.

O servidor mínimo tem três partes: 
1. Criar o WebSocketServer em uma porta 
2. Escutar o evento connection para receber novos clientes 
3. Interagir com cada cliente via ws

### Recebendo Dados com on(‘message’)
O evento `message` é disparado toda vez que um frame WebSocket completo chega do cliente. A biblioteca ws já decodificou o frame — você não precisa se preocupar com os bits de MASK, opcode ou payload.

```js
ws.on('message', (data, isBinary) => {
    console.log(data toString());
});
```

O parâmetro `data` pode ser: 
- **String** — se o frame chegou com opcode 0x1 (texto). A biblioteca converte automaticamente 
- **Buffer** — se o frame chegou com opcode 0x2 (binário). Ou se a string não couber na decodificação automática
O parâmetro `isBinary` é true se o frame for binário, false se for texto. Use-o para decidir como processar.

```js
ws.on('message', (data, isBinary) => {
    if (isBinary) {
        // Processar como Buffer
        console.log('Dados binários recebidos:', data);
    } else {
        // Processar como string
        console.log('Texto recebido:', data);
    }
});
```

### Enviando Dados com send()
O método send() aceita vários tipos de dado:

```js
// Enviar texto (opcode 0x1)
ws.send('Olá, cliente!');

// Enviar binário (opcode 0x2)
const buffer = Buffer.from([0x00, 0x01, 0x02]);
ws.send(buffer);

// Enviar objeto JSON (você precisa serializar)
ws.send(JSON.stringify({ tipo: 'mensagem', texto: 'Oi' }));
```

### A Guarda Canônica: readyState === OPEN

```js
if (ws.readyState === 1) { // 1 = WebSocket.OPEN
    ws.send(data);
}
```

ou
```js
const { WebSocket } = require('ws');
// ... no handler
if (ws.readyState === WebSocket.OPEN) {
    ws.send(data);
}
```

```js 
// A guarda completa
function sendMessage(ws, data) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(data);
        return true;
    }
    console.warn('Tentativa de enviar para conexão não aberta');
    return false;
}
```

## Broadcast: Comunicação em Grupo
No servidor eco, cada cliente só recebe as próprias mensagens de volta. Em um chat, você quer que a mensagem de um cliente chegue a **todos os outros clientes conectados**.
### A Solução: wss.clients
O WebSocketServer mantém um Set com todas as conexões ativas em wss.clients. Você pode iterar sobre ele para enviar uma mensagem para todos: 

```js
wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
        client.send(mensagem);
    }
});
```

### Excluindo o Emissor

```js
wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
    }
});
```