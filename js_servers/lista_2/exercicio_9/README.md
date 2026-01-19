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
## 🔮 Próximos passos sugeridos

* Persistir os dados em um **arquivo JSON**
* Integrar com um **banco de dados (SQLite, PostgreSQL, MongoDB)**
* Adicionar **Controller** entre Routes e Service (padrão MVC)
* Implementar **validação com Zod ou Joi**
* Criar testes automatizados

# ➕ Complemento do README — Módulo de Orders (Pedidos)
## 🛒 Novo recurso: Orders (Pedidos)

Além do cadastro de produtos, a API agora também permite o gerenciamento de **pedidos (orders).**

Cada pedido possui os seguintes atributos:

Campo |	Tipo	| Descrição
---|---|---
`id`	| inteiro |	Identificador único do pedido
`items` |	array	| Lista de itens do pedido

Cada item dentro de `items` possui:

Campo	| Tipo |	Descrição
---|---|---
`id` |	inteiro	| ID do produto pedido
`quantity`	| inteiro	| Quantidade solicitada do produto

⚠️ Assim como os produtos, os pedidos também são armazenados apenas em memória.

---
### 📁 Estrutura atualizada do projeto
```
product-api/
├── app.js
├── routes/
│   ├── product_routes.js
│   └── order_routes.js
├── services/
│   ├── product_service.js
│   └── order_service.js
└── validators/
    ├── product_validator.js
    └── order_validator.js
```
### Responsabilidades (atualizadas)
Arquivo	| Responsabilidade
--- |---
`routes/orderRoutes.js` |	Define endpoints de pedidos
`services/orderService.js` |	Regras de negócio e CRUD de pedidos
`validators/orderValidator.js`	| Validação do formato do pedido

---
### 🔁 Rotas de Orders
➤ **GET /api/order**
Retorna todos os pedidos.
``` bash
curl http://localhost:3000/api/order
``` 

➤ **GET /api/order/:id**
Retorna um pedido específico.
``` bash
curl http://localhost:3000/api/order/100
``` 

➤ **POST /api/order**
Cria um novo pedido.
``` bash
curl -X POST http://localhost:3000/api/order \
-H "Content-Type: application/json" \
-d '{
  "id": 100,
  "items": [
    { "id": 1, "quantity": 2 },
    { "id": 2, "quantity": 1 }
  ]
}'
``` 

➤ **PUT /api/order/:id**
Atualiza um pedido existente.
``` bash
curl -X PUT http://localhost:3000/api/order/100 \
-H "Content-Type: application/json" \
-d '{
  "items": [
    { "id": 1, "quantity": 5 }
  ]
}'
``` 

➤ **DELETE /api/order/:id**
Remove um pedido.
``` bash
curl -X DELETE http://localhost:3000/api/order/100
``` 
---
### ✅ O que este novo exercício acrescenta

Com a adição de **Orders**,  esse exercício passou a praticar também:
* Modelagem de dados mais complexos (objetos com arrays)
* Relacionamento conceitual entre **Products ↔ Orders**
* Reuso de arquitetura (mesmo padrão para dois domínios)
* Validação estruturada de objetos aninhados (`items`)
* Organização em múltiplos módulos (product + order)

---
🔮 Próximos passos sugeridos (agora com Orders)

* ✅ Validar se os **produtos do pedido realmente existem**
* ✅ Calcular **valor total do pedido**
* Relacionar pedidos a clientes
* Salvar pedidos em arquivo ou banco de dados
* Criar histórico de pedidos