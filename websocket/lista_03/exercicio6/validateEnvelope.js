const crypto = require('crypto');

function buildError(code, detail, originalId) {
    const errorEnvelope = {
        type: 'message:error',
        payload: {
            code,
            detail
        },
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString()
    };

    // Mantém a referência da mensagem original quando ela possui um ID.
    if (originalId !== undefined) {
        errorEnvelope.payload.originalId = originalId;
    }

    return errorEnvelope;
}

function isValidISO8601(value) {
    if (typeof value !== 'string') {
        return false;
    }

    const isoPattern =
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;

    return isoPattern.test(value) && !Number.isNaN(Date.parse(value));
}

function validateEnvelope(data) {
    // 1. O envelope deve ser um objeto, não nulo e não pode ser array.
    if (
        typeof data !== 'object' ||
        data === null ||
        Array.isArray(data)
    ) {
        return {
            ok: false,
            error: buildError(
                'INVALID_ENVELOPE',
                'O envelope deve ser um objeto não nulo e não pode ser um array.'
            )
        };
    }

    // 2. O type deve ser uma string não vazia.
    if (
        typeof data.type !== 'string' ||
        data.type.trim() === ''
    ) {
        return {
            ok: false,
            error: buildError(
                'INVALID_TYPE',
                'O campo type deve ser uma string não vazia.',
                data.id
            )
        };
    }

    // 3. O type deve seguir o padrão namespace:action.
    if (!data.type.includes(':')) {
        return {
            ok: false,
            error: buildError(
                'INVALID_NAMESPACE',
                'O campo type deve conter um namespace, como chat:message.',
                data.id
            )
        };
    }

    // 4. O payload deve ser um objeto não nulo e não pode ser array.
    if (
        typeof data.payload !== 'object' ||
        data.payload === null ||
        Array.isArray(data.payload)
    ) {
        return {
            ok: false,
            error: buildError(
                'MISSING_PAYLOAD',
                'O campo payload deve ser um objeto não nulo.',
                data.id
            )
        };
    }

    // 5. Quando presente, o timestamp deve ser um ISO 8601 válido.
    if (
        data.timestamp !== undefined &&
        !isValidISO8601(data.timestamp)
    ) {
        return {
            ok: false,
            error: buildError(
                'INVALID_TIMESTAMP',
                'O campo timestamp deve possuir uma data ISO 8601 válida.',
                data.id
            )
        };
    }

    return {
        ok: true,
        envelope: data
    };
}

// Testes
const testCases = [
    null,

    {
        type: 'chat:message'
    },

    {
        type: 'chatmessage',
        payload: {}
    },

    {
        type: 'chat:message',
        payload: {
            text: 'Oi'
        },
        id: 'abc',
        timestamp: '2026-01-01T00:00:00.000Z'
    },

    {
        type: 'chat:message',
        payload: {
            text: 'Oi'
        },
        id: 'abc',
        timestamp: 'data-invalida'
    }
];

testCases.forEach((input, i) => {
    const result = validateEnvelope(input);

    console.log(
        `Teste ${i + 1}:`,
        result.ok
            ? '✅ VÁLIDO'
            : `❌ ERRO: ${result.error.payload.code}`
    );

    if (result.ok) {
        console.log(
            '   Envelope:',
            JSON.stringify(result.envelope)
        );
    }
});
