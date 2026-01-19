import fs from 'fs';

export function readFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content;
}
