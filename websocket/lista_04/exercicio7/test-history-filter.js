const { Readable, Transform, Writable, pipeline } = require('stream');

const envelopes = [
    { type: 'chat:message', payload: { text: 'Oi', room: 'geral' }, id: '1' },
    { type: 'chat:message', payload: { text: 'Olá', room: 'tech' }, id: '2' },
    { type: 'chat:message', payload: { text: 'Tudo bem?', room: 'geral' }, id: '3' },
    { type: 'chat:message', payload: { text: 'Bug corrigido', room: 'tech' }, id: '4' },
    { type: 'chat:message', payload: { text: 'Até logo', room: 'geral' }, id: '5' }
];

class HistoryFilterTransform extends Transform {
    constructor({ room, limit }) {
        super({ objectMode: true });

        if (!room) {
            throw new Error('A opção "room" é obrigatória.');
        }

        if (!Number.isInteger(limit) || limit < 0) {
            throw new Error('A opção "limit" deve ser um inteiro maior ou igual a zero.');
        }

        this.room = room;
        this.limit = limit;
        this.emittedCount = 0;
    }

    _transform(envelope, encoding, callback) {
        try {
            const isChatMessage = envelope.type === 'chat:message';
            const belongsToRoom = envelope.payload?.room === this.room;
            const isWithinLimit = this.emittedCount < this.limit;

            if (isChatMessage && belongsToRoom && isWithinLimit) {
                this.emittedCount += 1;
                callback(null, envelope);
                return;
            }

            // Sem segundo argumento: o envelope é descartado.
            callback(null);
        } catch (error) {
            callback(error);
        }
    }
}

class MessagePrinterWritable extends Writable {
    constructor() {
        super({ objectMode: true });
        this.total = 0;
    }

    _write(envelope, encoding, callback) {
        this.total += 1;
        console.log(
            `[${envelope.id}] room=${envelope.payload.room} | ${envelope.payload.text}`
        );
        callback();
    }

    _final(callback) {
        console.log(`Total emitido: ${this.total}`);
        callback();
    }
}

function runFilter(room, limit) {
    console.log(`=== room=${room}, limit=${limit} ===`);

    return new Promise((resolve, reject) => {
        pipeline(
            Readable.from(envelopes, { objectMode: true }),
            new HistoryFilterTransform({ room, limit }),
            new MessagePrinterWritable(),
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            }
        );
    });
}

async function main() {
    await runFilter('geral', 2);
    await runFilter('tech', 10);
}

main().catch((error) => {
    console.error('Erro durante o teste:', error);
    process.exitCode = 1;
});