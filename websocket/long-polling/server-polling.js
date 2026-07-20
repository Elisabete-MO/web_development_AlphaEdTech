import { createServer } from 'http';
import { parse } from 'url';

const waitingClients = [];
let messageIdCounter = 4;

// armazenamento em memória
const messages = [
    {
        id: 1, text: 'Bem-vindo ao chat!', timestamp: new Date(Date.now() -
            60000).toISOString()
    },
    {
        id: 2, text: 'Esta é uma mensagem de exemplo', timestamp: new Date(Date.now() -
            30000).toISOString()
    },
    {
        id: 3, text: 'Polling em ação!', timestamp: new Date(Date.now() -
            5000).toISOString()
    },
];

function notifyClients(newMessage) {
    const clients = [...waitingClients];
    waitingClients.length = 0;
    clients.forEach(client => {
        clearTimeout(client.timeoutId);
        client.res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        });
        client.res.end(JSON.stringify([newMessage]));
    });
}

const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const pathname = parsedUrl.pathname;
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        });
        res.end();
        return;
    }

    if (pathname === '/messages' && req.method === 'GET') {
        const since = parsedUrl.query.since || new Date(0).toISOString();
        const filtered = messages.filter(m => new Date(m.timestamp) > new Date(since));
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        });
        res.end(JSON.stringify(filtered));

    } else if (pathname === '/messages/long-poll' && req.method === 'GET') {
        const since = parsedUrl.query.since || new Date(0).toISOString();
        const filtered = messages.filter(m => new Date(m.timestamp) > new Date(since));
        if (filtered.length > 0) {
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            });
            res.end(JSON.stringify(filtered));
        } else {
            const timeoutId = setTimeout(() => {
                const index = waitingClients.findIndex(c => c.res === res);
                if (index !== -1) waitingClients.splice(index, 1);
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                });
                res.end(JSON.stringify([]));
            }, 25000);

            waitingClients.push({ res, since, timeoutId });

            req.on('close', () => {
                const index = waitingClients.findIndex(c => c.res === res);
                if (index !== -1) {
                    clearTimeout(waitingClients[index].timeoutId);
                    waitingClients.splice(index, 1);
                }
            });
        }
    } else if (pathname === '/messages' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const { text } = JSON.parse(body);
            const newMessage = {
                id: messageIdCounter++,
                text,
                timestamp: new Date().toISOString(),
            };
            messages.push(newMessage);
            notifyClients(newMessage);
            res.writeHead(201, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            });
            res.end(JSON.stringify(newMessage));
        });

    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
    console.log('Polling: GET /messages?since=ISO_TIMESTAMP');
    console.log('Long-Polling: GET /messages/long-poll?since=ISO_TIMESTAMP');
    console.log('Adicionar: POST /messages com JSON { "text": "..." }');
});


// curl -X POST http://localhost:3000/messages \
// -H "Content-Type: application/json" \
// -d '{"text": "Nova mensagem via curl!"}'