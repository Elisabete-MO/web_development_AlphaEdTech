import { readFile } from './reader.js';

const filePath = './file.txt';

const content = readFile(filePath);

console.log(content);
