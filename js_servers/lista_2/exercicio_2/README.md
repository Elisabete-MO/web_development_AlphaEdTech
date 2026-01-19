
# 📄 Leitura de Arquivo com Node.js usando ES Modules (ESM)

## 📁 Estrutura do projeto

``` 
project/
├── fileReader.js
├── app.js
├── sample.txt
└── package.json
``` 

----------

## 1️⃣ Habilitando ES Modules (`package.json`)

Para utilizar **ES Modules (ESM)**, é necessário informar ao Node.js que o projeto usa esse padrão.

### `package.json`

``` json
{  
  "name":  "esm-file-reader",  
  "version":  "1.0.0",  
  "type":  "module"  
}
``` 

📌 A propriedade `"type": "module"` é obrigatória para usar ESM sem a extensão `.mjs`.
* `.mjs` é uma extensão de arquivo JavaScript que força o uso de ES Modules (ESM), independentemente das configurações do projeto.

----------

## 2️⃣ Função para leitura do arquivo (`fileReader.js`)

Arquivo responsável por ler o conteúdo de um arquivo de texto.

### `fileReader.js`

``` js
import fs from 'fs';

export function readFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content;
}
```

📌 Diferenças em relação ao CommonJS:

-   Utiliza `import` no lugar de `require`
-   Utiliza `export` no lugar de `module.exports`

----------

## 3️⃣ Arquivo principal da aplicação (`app.js`)

Arquivo responsável por importar a função e exibir o conteúdo do arquivo no terminal.

### `app.js`

``` js
import { readFile } from  './fileReader.js'; 
const filePath = './sample.txt'; 
const content = readFile(filePath); 
console.log(content);
```

📌 Importante:

-   Em ESM, a **extensão do arquivo é obrigatória** (`.js`)
-   Os imports são sempre explícitos


----------

## 4️⃣ Arquivo de texto de exemplo (`file.txt`)

```
Hello!
This file is being read using ES Modules.
```

----------

## 5️⃣ Executando a aplicação

No diretório raiz do projeto, execute:

`node app.js` 

### Saída esperada:

`Hello!
This file  is being read using ES Modules.` 

----------

## 🧠 Principais diferenças: CommonJS vs ESM

| CommonJS | ESM | 
|----------|----------| 
| `require()` | `import` |
| `module.exports` | `export` |
| Extensão não obrigatória | Extensão obrigatória |
| Padrão antigo do Node.js | Padrão do JavaScript moderno |

----------

## ✅ Conceitos praticados neste exercício

-   ES Modules (ESM)
-   Exportações nomeadas
-   Leitura de arquivos com o módulo `fs`
-   Configuração de projeto com `package.json`


----------

✨ Exercício ideal para compreender as diferenças entre CommonJS e ESM e praticar o padrão moderno de módulos no Node.js.