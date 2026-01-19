const readFile = require('./reader');

const filePath = './file.txt';

const content = readFile(filePath);

console.log(content);