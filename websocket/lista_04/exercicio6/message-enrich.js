import { Transform } from "stream";
const os = require('os');

class MessageEnrichTransform extends Transform {
    constructor(options = {}) {
        super({ ...options, objectMode: true });
        this.seq = 0;
        this.serverId = os.hostname();
    }

    _transform(envelope, encoding, callback) {
        try {
            this.seq += 1;

            const enrichedEnvelope = {
                ...envelope,
                serverId: this.serverId,
                serverTimestamp: new Date().toISOString(),
                seq: this.seq
            };

            callback(null, enrichedEnvelope);
        } catch (error) {
            callback(error);
        }
    }
}

module.exports = { MessageEnrichTransform };