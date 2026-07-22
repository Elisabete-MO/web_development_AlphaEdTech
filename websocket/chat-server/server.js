// Verificação: Execute o servidor e envie algumas mensagens de chat de um cliente WebSocket. Depois
// inspecione chat.log:
// cat chat.log
// MessageRouter, compose, auth, rate limit, logging

const http = require('http');
const { WebSocketServer } = require('ws');
const url = require('url');
const jwt = require('jsonwebtoken');
const { MessageRouter } = require('./lib/message-router');
const { compose } = require('./lib/compose'); // da Aula 03
const { streamHistoryHttp } = require('./history');
const { createLoggerStream } = require('./lib/logger-stream');
const { v4: uuidv4 } = require('uuid');

// ─── Servidor HTTP (compartilha porta com WS) ─────
const httpServer = http.createServer(function onRequest(req, res) {
    if (req.url.startsWith('/history')) {
        streamHistoryHttp(req, res, 'chat.log');
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

// ─── WebSocket Server anexado ao HTTP ─────────────
const wss = new WebSocketServer({ server: httpServer });

// ─── Validação ──────────────────────────────────────
function validateEnvelope(data) {
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
        return {
            ok: false, error: buildError('INVALID_ENVELOPE', 'Deve ser um objeto JSON', data?.id)
        };
    }
    if (typeof data.type !== 'string' || data.type.trim() === '') {
        return {
            ok: false, error: buildError('INVALID_TYPE', 'type é obrigatório',
                data?.id)
        };
    }
    if (!data.type.includes(':')) {
        return {
            ok: false, error: buildError('INVALID_NAMESPACE', 'type deve seguir namespace: action', data?.id)
        };
    }
    if (typeof data.payload !== 'object' || data.payload === null) {
        return {
            ok: false, error: buildError('MISSING_PAYLOAD', 'payload é obrigatório', data?.id)
        };
    }
    if (data.timestamp) {
        const parsed = new Date(data.timestamp);
        if (isNaN(parsed.getTime())) {
            return {
                ok: false, error: buildError('INVALID_TIMESTAMP', 'timestamp ISO inválido', data?.id)
            };
        }
    }
    return { ok: true, envelope: data };
}

function buildError(code, detail, originalId) {
    return {
        type: 'message:error',
        payload: { code, detail },
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString()
    };
}

// ─── Servidor ───────────────────────────────────────
wss.on('connection', function onConnection(ws) {
    ws.on('message', function onMessage(data) {
        const raw = data.toString();
        // 1. Parse JSON
        let envelope;
        try {
            envelope = JSON.parse(raw);
        } catch (e) {
            ws.send(JSON.stringify({ type: 'message: error', payload: { code: 'INVALID_JSON' } }));
            return;
        }
        // 2. Validar envelope
        const validation = validateEnvelope(envelope);
        if (!validation.ok) {
            ws.send(JSON.stringify(validation.error));
            return;
        }

        // 2. Pipeline de middlewares (existente da Aula 03)
        // middlewarePipeline(ws, envelope, function onComplete(ws, envelope) {
        // 3. Router dispatch (existente da Aula 03)
        // const result = router.dispatch(ws, envelope);
        // 🆕 NOVO: persistência com Streams
        logStream.write(envelope, (err) => {
            if (err) console.error('[LOG] Erro ao persistir:', err.message);
        });

        // 5. Broadcast
        const broadcastEnvelope = {
            type: 'message:broadcast',
            payload: {
                text: validation.envelope.payload.text || '',
                originalId: validation.envelope.id
            },
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString()
        };
        const json = JSON.stringify(broadcastEnvelope);
        wss.clients.forEach(function each(client) {
            if (client.readyState === 1 && client !== ws) {
                client.send(json);
            }
        });
    });
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`WebSocket em ws://localhost:${PORT}`);
    console.log(`Histórico em http://localhost:${PORT}/history?room=geral&limit=10`);
});

// # Terminal 1: inicie o servidor
// node server.js
// # Terminal 2: envie mensagens (use seu cliente WebSocket)
// # Terminais 3: teste o histórico
// curl "http://localhost:8080/history?room=geral&limit=10" | jq '.messages | length'
// # Deve retornar 10 (ou menos se houver menos de 10 mensagens na room)