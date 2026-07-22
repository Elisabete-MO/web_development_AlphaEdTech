import { pipeline, Transform } from "stream";
import fs from "fs";
import { MessageEnrichTransform } from "../transforms/message-enrich";

function createLoggerStream(logPath = 'chat.log') {
    const enrich = new MessageEnrichTransform();
    const serializer = new Transform({
        writableObjectMode: true,
        readableObjectMode: false,
        transform(envelope, encoding, callback) {
            callback(null, JSON.stringify(envelope) + '\n');
        }
    });
    const logFile = fs.createWriteStream(logPath, { flags: 'a' });
    pipeline(enrich, serializer, logFile, (err) => {
        if (err) console.error('[LOGGER] Pipeline de log falhou:', err.message);
    });
    return enrich; // retorna a entrada do pipeline (Transform)
}
module.exports = { createLoggerStream };