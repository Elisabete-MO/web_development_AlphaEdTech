import { Transform, pipeline } from "stream";
import { createReadStream, createWriteStream } from "fs";

class UppercaseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        try {
            const texto = chunk.toString();
            const textoMaiusculo = texto.toUpperCase();

            callback(null, textoMaiusculo);
        } catch (error) {
            callback(error);
        }
    }
}

pipeline(
    createReadStream('input.txt'),
    new UppercaseTransform(),
    createWriteStream('frases-maiusculas.txt'),
    (error) => {
        if (error) {
            console.error('Erro no pipeline:', error);
            return;
        }

        console.log('Pipeline concluído com sucesso!');
    }
);
