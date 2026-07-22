import { Writable, pipeline } from "stream";
import { createReadStream } from "fs";

class ByteCounter extends Writable {
    constructor(options = {}) {
        super(options);
        this.totalBytes = 0;
    }

    _write(chunk, encoding, callback) {
        try {
            const bytesRecebidos = Buffer.isBuffer(chunk)
                ? chunk.length
                : Buffer.byteLength(chunk, encoding);

            this.totalBytes += bytesRecebidos;
            console.log(`Bytes recebidos até agora: ${this.totalBytes}`);

            callback();
        } catch (error) {
            callback(error);
        }
    }

    _final(callback) {
        console.log(`Total processado: ${this.totalBytes} bytes`);
        callback();
    }
}

pipeline(
    createReadStream('input.txt', { highWaterMark: 32 }),
    new ByteCounter(),
    (error) => {
        if (error) {
            console.error('Erro no pipeline:', error);
            return;
        }

        console.log('Pipeline concluído com sucesso!');
    }
);