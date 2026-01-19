# 📦 Customer, Product, Order API — RESTful API (Node + Express)
## 📌 Sobre o projeto

Este projeto implementa uma **API RESTful para gerenciamento de clientes, produtos e pedidos**, desenvolvida com **Node.js e Express**, utilizando **ESM (ECMAScript Modules)** e uma arquitetura modular em camadas.

A aplicação segue uma separação clara de responsabilidades:
* **Routes** → recebem requisições HTTP e definem os endpoints
* **Controllers** → coordenam o fluxo da requisição, chamando validações e regras de negócio
* **Service** → contém regras de negócio e manipulação dos dados
* **Validator** → validam e sanitizam entradas recebidas pelo cliente

⚠️ **Observação importante:**
Os dados (clientes, produtos e pedidos) são armazenados apenas em memória (arrays em tempo de execução). Isso significa que, ao reiniciar o servidor, todas as informações são perdidas.

---
## 🧱 Modelos de dados
### ✅ Cliente (`Customer`)
Campo	| Tipo	| Descrição
--- | --- | ---
`id`	| inteiro	| Identificador único do cliente
`name` |	string	| Nome do cliente
`email`	| string	| email do cliente

### ✅ Produto (`Product`)
Campo	| Tipo	| Descrição
--- | --- | ---
`id`	| inteiro	| Identificador único do produto
`name` |	string	| Nome do produto
`value`	| número	| Valor do produto (duas casas decimais)

### ✅ Pedido (`Order`)
Campo |	Tipo	| Descrição
--- | --- | ---
`id`	| inteiro |	Identificador único do pedido
`items` |	array	| Lista de itens do pedido

Cada item dentro de `items` possui:

Campo |	Tipo |	Descrição
--- | --- | ---
`id`	| inteiro |	ID do produto pedido
`quantity`	| inteiro |	Quantidade solicitada

---
## 📁 Estrutura do projeto
```
product-api/
└── src/
    ├── app.js
    │
    ├── routes/
    │   ├── index.js
    │   ├── product_routes.js
    │   ├── order_routes.js
    │   └── customer_routes.js
    │
    ├── controllers/
    │   ├── index.js
    │   ├── productController.js
    │   ├── orderController.js
    │   └── customerController.js
    │
    ├── services/
    │   ├── index.js
    │   ├── product_service.js
    │   ├── order_service.js
    │   └── customer_service.js
    │
    ├── validators/
    │   ├── index.js
    │   ├── product_validator.js
    │   ├── order_validator.js
    │   └── customer_validator.js
    │
    └── public/
        ├── index.html
        ├── style.css
        └── script.js

```

### Responsabilidades por camada
Arquivo |	Responsabilidade
--- | ---
`app.js`	| Configuração do servidor Express e integração frontend/backend
`*/index.js` | Centraliza exportações de cada camada e organiza imports 
`routes/*_routes.js`	| Define endpoints e respostas HTTP
`services/*_service.js`	| Regras de negócio e operações CRUD
`validators/*_validator.js`	| Validação dos dados de entrada
`public/`	| Interface web para consumir a API


## 📦 Padrão de organização — Arquivos `index.js`

O projeto utiliza arquivos `index.js` como ponto central de exportação para cada camada (também conhecidos como *barrel files*). Isso evita múltiplos imports diretos de arquivos individuais e melhora a legibilidade do código.

Exemplo:

### ✔️ Routes (`routes/index.js`)
```js
import { Router } from "express";
import orderRoutes from "./orderRoutes.js";
import productRoutes from "./productRoutes.js";

const router = Router();

router.use("/order", orderRoutes);
router.use("/product", productRoutes);

export default router;
```
### ✔️ Controllers (`controllers/index.js`)
```js
export * as orderController from "./orderController.js";
export * as productController from "./productController.js";

```
### ✔️ Services (`services/index.js`)
```js
export * as orderService from "./orderService.js";
export * as productService from "./productService.js";

```

### Benefícios desse padrão:

* Imports mais limpos
* Melhor organização do projeto
* Facilita futuras refatorações

---
## 🌐 Integração Frontend + Backend

Este projeto **não possui um servidor de frontend separado**. O próprio Express serve os arquivos estáticos da pasta `public/`.

Isso é feito no `app.js` com:
```js
app.use(express.static("public"));
```

### Como acessar a interface web

Inicie o servidor:
``` bash
node app.js
```

Abra no navegador:
``` bash
http://localhost:3000/
```

A página `public/index.html` será carregada automaticamente.

### Como o frontend se comunica com a API

No arquivo `public/script.js`, as requisições são feitas usando **Fetch API** para rotas relativas, por exemplo:

```js
fetch("/api/product")
fetch("/api/order")
```

Isso garante que:
* Funcione em `localhost`
* Funcione também caso o projeto seja hospedado na nuvem no futuro

---
## 🚀 Como executar o projeto
### 1️⃣ Instalar dependências
``` bash
npm install
```

### 2️⃣ Iniciar o servidor
``` bash
npm start
```

O servidor será iniciado em:
``` bash
http://localhost:3000
```

---


## 🛡️ Validações de entrada

A API inclui validações para garantir consistência dos dados antes de chegar às regras de negócio. Entre elas:

- Verificação de tipos (`string`, `number`, `array`, etc.)
- Validação de formato de e-mail com expressão regular
- Verificação de campos obrigatórios
- Validação de quantidade positiva em pedidos

Exemplo de validação de e-mail utilizada no projeto:

```js
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (typeof email !== "string") {
  return res.status(400).json({ message: "email deve ser uma string" });
}

if (!emailRegex.test(email)) {
  return res.status(400).json({ message: "email inválido" });
}
```
Essas validações ficam concentradas na camada Validator, mantendo rotas mais limpas e organizadas.

---
## 🔁 Rotas da API — Customers
➤ **GET /api/customer**
Retorna todos os clientes.
```bash
curl http://localhost:3000/api/customer
```
➤ **GET /api/customer/:id**
Retorna um cliente específico pelo `id`.
```bash
curl http://localhost:3000/api/customer/1
```
➤ **POST /api/customer**
Cadastra um novo cliente.
```bash
curl -X POST http://localhost:3000/api/customer \
-H "Content-Type: application/json" \
-d '{"id":1,"name":"John","email": "john@exemple.com"}'
```
➤ **PUT /api/customer/:id**
Atualiza um cliente existente.
```bash
curl -X PUT http://localhost:3000/api/customer/1 \
-H "Content-Type: application/json" \
-d '{"name":"John","email": "john@exemple.com"}'
```
➤ **DELETE /api/customer/:id**
Remove um cliente pelo `id`.
```bash
curl -X DELETE http://localhost:3000/api/customer/1
```

## 🔁 Rotas da API — Products
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
## 🔁 Rotas da API — Orders
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
## 🖥️ Interface Web (Frontend)

A aplicação inclui uma página simples em HTML/CSS/JS que permite:
* Listar produtos
* Criar produtos
* Listar pedidos
* Criar pedidos

![Screenshot da aplicação](./assets/product_api.png)

📍 Arquivos principais:
* `public/index.html` → estrutura da página
* `public/style.css` → estilização básica
* `public/script.js` → lógica de consumo da API via `fetch`

#### 🎯 Objetivo didático:
A interface é funcional, mas prioriza aprendizado e integração com a API — não um design avançado.

---
### ✅ O que este conjunto de exercícios pratica

Este projeto consolida:
* Conceitos de **API RESTful**
* Métodos HTTP: **GET, POST, PUT, DELETE**
* Parâmetros de rota (´:id´)
* Respostas em **JSON**
* Arquitetura modular (Routes, Service, Validator)
* Uso de **Express + ESM**
* Integração **Frontend + Backend no mesmo servidor**
* Consumo de API com **Fetch**
* Modelagem de dados mais complexos (Orders com array de items)

---
### 🔮 Próximos passos sugeridos (evolução do projeto)

* ✅ Validar se os **produtos do pedido realmente existem**
* ✅ Calcular **valor total do pedido**
* Relacionar pedidos a clientes
* Persistir dados em **arquivo JSON**
* Integrar com banco de dados (SQLite, PostgreSQL ou MongoDB)
* *Evoluir para um padrão mais próximo de MVC (separando melhor Controller e Service em responsabilidades claras)*
* Padronizar **respostas de erro** em um **middleware** global  
* Centralizar validações com **Zod** ou **Joi**
* Criar testes automatizados