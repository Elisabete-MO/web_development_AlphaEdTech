const fs = require('fs');

function readFile(fileName) {
  const content = fs.readFileSync(fileName, 'utf-8');
  return content;
}

module.exports = readFile;
