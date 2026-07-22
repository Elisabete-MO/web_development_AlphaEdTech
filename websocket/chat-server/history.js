// Mão na Massa — API de histórico
// ☐ Crie o arquivo history.js com a função streamHistoryHttp
// ☐ Modifique o server.js para usar http.createServer + WebSocketServer({ server:
// httpServer })
// ☐ Adicione a rota GET /history
// ☐ Teste: envie 20 mensagens de chat, depois acesse
// http://localhost:8080/history?room=geral&limit=5

// Verificação:
// # Envie mensagens via WebSocket (use seu cliente de chat ou curl com ws)
// # Depois:
// curl http://localhost:8080/history?room=geral&limit=5
// A resposta deve ser um JSON com { "messages": [...] } contendo as 5 mensagens mais recentes da
// room “geral”.

import fs from "fs";
import { pipeline, Transform, Writable } from "stream";

// ─── Transform que acumula linhas e parseia JSON ───
function createLineParser() {
    let buffer = '';
    return new Transform({
        transform(chunk, encoding, callback) {
            buffer += chunk.toString();
            const lines = buffer.split('\n');
            buffer = lines.pop(); // última linha pode estar incompleta
            for (const line of lines) {
                if (line.trim()) {
                    try {
                        this.push(JSON.parse(line)); // emite objeto
                    } catch (e) {
                        // ignora linha inválida
                    }
                }
            }
            callback();
        },
        flush(callback) {
            // Processa o buffer restante no final
            if (buffer.trim()) {
                try {
                    this.push(JSON.parse(buffer));
                } catch (e) { /* ignora */ }
            }
            callback();
        }
    });
}

// ─── Transform que filtra por room e limita quantidade ───
function createHistoryFilter(room, limit = 50) {
    let sent = 0;
    return new Transform({
        objectMode: true,
        transform(envelope, encoding, callback) {
            if (sent >= limit) {
                this.push(null); // sinaliza fim
                callback();
                return;
            }
            if (!room || (envelope.payload && envelope.payload.room === room)) {
                sent++;
                callback(null, envelope);
            } else {
                callback(); // descarta
            }
        }
    });
}

// ─── Transform que serializa objeto → JSON string ───
function createJsonSerializer() {
    return new Transform({
        writableObjectMode: true,
        readableObjectMode: false,
        transform(envelope, encoding, callback) {
            callback(null, JSON.stringify(envelope) + '\n');
        }
    });
}

// ─── Função principal: streamHistoryHttp ──────────
function streamHistoryHttp(req, res, logPath = 'chat.log') {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const room = url.searchParams.get('room') || null;
    const limit = parseInt(url.searchParams.get('limit'), 10) || 50;
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Transfer-Encoding': 'chunked'
    });

    // Monta o array no destino (Writable)
    const messages = [];

    pipeline(
        fs.createReadStream(logPath),
        createLineParser(),
        createHistoryFilter(room, limit),
        createJsonSerializer(),
        new Writable({
            objectMode: true,
            write(chunk, encoding, callback) {
                messages.push(JSON.parse(chunk.toString())); //envelope?
                callback();
            }
        }),
        (err) => {
            if (err) console.error('[HIST] Erro no streaming:', err.message);
            res.end(JSON.stringify({ messages }));
        }
    );
}
module.exports = { streamHistoryHttp };