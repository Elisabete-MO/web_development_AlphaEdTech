const http = require('http');
const url = require('url');

const messages = [
    { id: 1, text: 'Olá!', timestamp: '2026-07-13T10:00:00.000Z' },
    { id: 2, text: 'Como vai?', timestamp: '2026-07-13T10:05:00.000Z' }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/messages' && req.method === 'GET') {
        // 1. Recupera o parâmetro "since". Se não existir, usa a data 0.
        const since = parsedUrl.query.since
            ? new Date(parsedUrl.query.since).getTime()
            : 0;

        // 2. Mantém apenas mensagens mais recentes que "since".
        const filtered = messages.filter(
            message => new Date(message.timestamp).getTime() > since
        );

        // 3. Envia a resposta JSON com status 200 e suporte a CORS.
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });

        res.end(JSON.stringify(filtered));
        return;
    }

    res.writeHead(404, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    res.end(JSON.stringify({ error: 'Rota não encontrada' }));
});

server.listen(3000, () => {
    console.log('Servidor de teste rodando em http://localhost:3000');
});

// node server.js
// http://localhost:3000/messages
// curl http://localhost:3000/messages
// curl "http://localhost:3000/messages?since=2026-07-13T10:00:00.000Z"