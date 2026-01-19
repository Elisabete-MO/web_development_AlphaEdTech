# 📄 Leitura de Arquivo com Node.js (CommonJS)

## 📌 Descrição do exercício

Este projeto tem como objetivo praticar:

-   Criação de funções em JavaScript
-   Uso de módulos com **CommonJS**
-   Leitura de arquivos utilizando o módulo nativo **fs** do Node.js

O exercício consiste em:

1.  Criar uma função que receba o nome (ou caminho) de um arquivo e retorne o seu conteúdo.
2.  Importar essa função em outro arquivo (`app.js`) usando CommonJS.
3.  Exibir no terminal o conteúdo do arquivo lido.

----------

## 🗂 Estrutura do projeto

`projeto/
├── reader.js
├── app.js
└── file.txt` 

----------

## 📁 Arquivos do projeto

### `reader.js`

Contém a função responsável por ler o conteúdo de um arquivo.

-   Utiliza o módulo nativo `fs`
-   Exporta a função usando `module.exports`

### `app.js`

Arquivo principal da aplicação.

-   Importa a função de leitura usando `require`
-   Passa o caminho do arquivo como argumento
-   Exibe o conteúdo no console

### `arquivo.txt`

Arquivo de texto utilizado como exemplo para leitura.

----------

## ▶️ Como executar o projeto

1.  Certifique-se de ter o **Node.js** instalado.
2.  No terminal, navegue até a pasta do projeto.
3.  Execute o comando:

`node app.js` 

----------

## ✅ Resultado esperado

O conteúdo do arquivo `file.txt` será exibido no terminal.

Exemplo:

`Hello World!` 

----------

## 🧠 Conceitos utilizados

-   Node.js
-   CommonJS (`require` e `module.exports`)
-   Módulo `fs`
-   Leitura síncrona de arquivos (`readFileSync`)

----------

## 📝 Observações

-   A leitura do arquivo é feita de forma **síncrona**, adequada para fins didáticos.
-   Em aplicações reais, o uso de leitura assíncrona é mais recomendado.    
-   O caminho do arquivo pode ser relativo ou absoluto.

----------

✨ Exercício ideal para fixar conceitos básicos de módulos e filesystem no Node.js.