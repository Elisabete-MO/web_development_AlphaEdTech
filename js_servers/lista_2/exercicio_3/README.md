
## 📁 Estrutura do projeto

`express-static-server/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
└── package.json` 

----------

## 1️⃣ Inicializar o projeto

No terminal:

`npm init -y
npm install express` 

Configuração do no projeto ESM:

### `package.json`

``` json
{
  "name": "express-static-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^5.2.1"
  }
}

``` 

----------

## 2️⃣ Criar o servidor Express (`server.js`)

### `server.js`

``` js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// Fix needed because __dirname does not exist in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

`` 

📌 Pontos importantes:

-   `express.static()` serve arquivos HTML, CSS e JS
-   Organizado dentro da pasta `public` 
-   Em ESM, é preciso recriar o `__dirname`

----------

## 3️⃣ Criar a página HTML (`public/index.html`)

### `index.html`

``` html 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Express Static Server</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>Express Static Server</h1>
  <p>This page is being served by Express.</p>

  <button id="btn">Click me</button>

  <script src="script.js"></script>
</body>
</html>
```

----------

## 4️⃣ Criar o CSS (`public/style.css`)

### `style.css`

``` css
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  padding: 40px;
}

h1 {
  color: #333;
}

button {
  padding: 10px 16px;
  font-size: 16px;
  cursor: pointer;
}
``` 

----------

## 5️⃣ Criar o JavaScript (`public/script.js`)

### `script.js`

```js
const button = document.getElementById('btn');

button.addEventListener('click', () => {
  alert('JavaScript is working!');
});

``` 

📌 Isso demonstra que:

-   O HTML foi servido
-   O CSS foi carregado
-   O JavaScript está funcionando

----------

## 6️⃣ Executar o servidor

`npm start` 

Acesse no navegador:

`http://localhost:3000` 

----------

## ✅ Resultado esperado

-   Página HTML carregando corretamente
-   Estilo CSS aplicado
-   JavaScript respondendo ao clique do botão
-   Servidor Express rodando