// Nesse código, o laço para assim que write() retorna false. A produção só continua após o evento drain, que indica que o buffer interno foi esvaziado o suficiente para receber mais dados.

const fs = require('fs');

const dest = fs.createWriteStream('grande.txt');
const TOTAL = 1000000;

function generateData() {
    let i = 0;

    function writeData() {
        let podeContinuar = true;

        while (i < TOTAL && podeContinuar) {
            const dado = `Dado número ${i}\n`;

            // false indica que o buffer atingiu o highWaterMark.
            podeContinuar = dest.write(dado);
            i++;
        }

        if (i < TOTAL) {
            // Retoma a produção somente quando o buffer for esvaziado.
            dest.once('drain', writeData);
            return;
        }

        dest.end(() => {
            console.log('Terminou');
        });
    }

    writeData();
}

dest.on('error', (error) => {
    console.error('Erro durante a escrita:', error);
});

generateData();