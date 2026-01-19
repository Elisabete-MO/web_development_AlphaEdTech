# 📄 Captura de Processos do Sistema com Node.js

## 📌 Descrição do exercício

Este projeto tem como objetivo praticar a integração do **Node.js com o sistema operacional**, por meio da execução de comandos do shell e do tratamento da saída desses comandos.

O exercício consiste em:

1.  Executar o comando `ps auxw` para listar os processos em execução na máquina.
2.  Capturar essa saída dentro de uma aplicação Node.js.
3.  Identificar o **PID do próprio processo Node que está sendo executado**.
4.  Exibir **apenas as informações do processo correspondente a esse PID**.


----------

## 🗂 Estrutura do projeto

`node-process-info/
├── app.js
└── package.json` 

----------

## ⚙️ Tecnologias utilizadas

-   Node.js
-   ES Modules (ESM)
-   Módulo nativo `child_process`
-   Comando de sistema `ps auxw` (Unix/Linux)

----------

## 📁 Arquivos do projeto

### `app.js`

Arquivo principal da aplicação.

Responsável por:
-   Obter o PID do processo Node em execução
-   Executar o comando `ps auxw`
-   Processar a saída do comando
-   Filtrar e exibir apenas o processo correspondente ao PID do Node


### `package.json`

Arquivo de configuração do projeto.
-   Define o uso de ES Modules
-   Contém as informações básicas do projeto

----------

## ▶️ Como executar o projeto

### 1️⃣ Pré-requisitos

-   Node.js instalado
-   Sistema operacional Unix/Linux (o comando `ps auxw` não é nativo do Windows)

----------

### 2️⃣ Execução

No diretório raiz do projeto, execute:

`node app.js` 

----------

## ✅ Resultado esperado

O programa exibirá no terminal **apenas a linha do comando `ps auxw` correspondente ao processo Node que está sendo executado**.

Exemplo de saída:

`vm 12345  0.2  0.1  123456  7890 pts/0  Sl  14:22  0:00 node app.js` 

----------

## 🧠 Conceitos abordados neste exercício

-   Execução de comandos do sistema operacional com Node.js
-   Uso do módulo `child_process`
-   Leitura e tratamento da saída de comandos (`stdout`)
-   Identificação de processos pelo PID
-   Uso da variável `process.pid`
-   Manipulação de strings e arrays em JavaScript

----------

## ⚠️ Observações importantes

-   O comando `ps auxw` é específico de sistemas Unix/Linux.
-   Em ambientes Windows, é necessário adaptar o comando (por exemplo, utilizando `tasklist`).
-   O filtro por PID utiliza espaços antes e depois do número para evitar falsos positivos.

----------

✨ Este exercício demonstra a capacidade de integrar aplicações Node.js com o sistema operacional, indo além de servidores web e APIs REST.