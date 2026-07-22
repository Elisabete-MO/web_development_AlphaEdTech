import { Transform } from "stream";
const os = require('os');

class MessageEnrichTransform extends Transform {
    constructor(options = {}) {
        super({ ...options, objectMode: true });
        this.seq = 0;
    }

    _transform(envelope, encoding, callback) {
        const enriched = {
            ...envelope,
            serverId: os.hostname(),
            serverTimestamp: new Date().toISOString(),
            seq: this.seq++
        };
        callback(null, enriched);
    }
}

module.exports = { MessageEnrichTransform };