# 📦 Product API — RESTful API (Node + Express)
## 📌 Sobre o projeto

Este projeto implementa uma **API RESTful para cadastro e gerenciamento de produtos**, desenvolvida com **Node.js e Express** utilizando **ESM (ECMAScript Modules)** e uma arquitetura em camadas:

* **Routes** → gerenciam requisições HTTP
* **Service** → contém regras de negócio e manipulação dos dados
*  **Validator** → valida entradas recebidas pelo cliente

Os produtos possuem os seguintes atributos:

Campo |	Tipo	| Descrição
--- | --- | ---
`id` |	inteiro	| Identificador único do produto
`name` |	string |	Nome do produto
`value`	| número |	Valor do produto (duas casas decimais)

⚠️ Observação: os dados são armazenados em memória (array). Ao reiniciar o servidor, os produtos são perdidos.

---
## 📁 Estrutura do projeto
product-api/
├── app.js
├── product_routes.js
├── product_service.js
└── product_validator.js

### Responsabilidades por camada
Arquivo	| Responsabilidade
--- | ---
`app.js`	| Configuração do servidor Express
`routes/productRoutes.js`	| Define endpoints e respostas HTTP
`services/productService.js`	| Regras de negócio e CRUD
`validators/productValidator.js`	| Validação dos dados de entrada

---
## 🚀 Como executar
### 1️⃣ Instalar dependências
``` bash
npm install
```
### 2️⃣ Iniciar o servidor
```bash
npm start
```

O servidor será iniciado em:
```bash	
http://localhost:3000
```

----
## 🔁 Rotas da API
➤ **GET /api/product**
Retorna todos os produtos.
```bash
curl http://localhost:3000/api/product
```
➤ **GET /api/product/:id**
Retorna um produto específico pelo `id`.
```bash
curl http://localhost:3000/api/product/1
```
➤ **POST /api/product**
Cadastra um novo produto.
```bash
curl -X POST http://localhost:3000/api/product \
-H "Content-Type: application/json" \
-d '{"id":1,"name":"Notebook","value":3500.00}'
```
➤ **PUT /api/product/:id**
Atualiza um produto existente.
```bash
curl -X PUT http://localhost:3000/api/product/1 \
-H "Content-Type: application/json" \
-d '{"name":"Notebook Gamer","value":4200.00}'
```
➤ **DELETE /api/product/:id**
Remove um produto pelo `id`.
```bash
curl -X DELETE http://localhost:3000/api/product/1
```

---
## ✅ O que este exercício pratica

Este projeto ajuda a consolidar:
* Conceitos de **API RESTful**
* Métodos HTTP: **GET, POST, PUT, DELETE**
* Parâmetros de rota (`:id`)
* Respostas em **JSON**
* Boas práticas de separação de responsabilidades
* Uso de **Express + ESM**

---
## 🔮 Próximos passos sugeridos (opcional)

* Persistir os dados em um **arquivo JSON**
* Integrar com um **banco de dados (SQLite, PostgreSQL, MongoDB)**
* Adicionar **Controller** entre Routes e Service (padrão MVC)
* Implementar **validação com Zod ou Joi**
* Criar testes automatizados