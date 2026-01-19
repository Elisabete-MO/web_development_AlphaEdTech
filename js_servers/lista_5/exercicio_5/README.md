# 📦 Customer, Product, Order API — RESTful API (Node + Express)
## 📌 Sobre o projeto

API RESTful para cadastro e gerenciamento de produtos, construída com **Node.js, Express e ESM**, utilizando arquitetura em camadas e boas práticas de desenvolvimento.

Principais recursos:
* CRUD completo de produtos (`GET`, `POST`, `PUT`, `DELETE`)
* Validação de dados com esquemas (`id` numérico, `name` e `value`)
* Tratamento de erros com middleware centralizado
* Proteção de endpoints e headers com Helmet e CORS
* Logging condicional (`console` desligado durante testes)

⚠️ **Observação importante:**
Os dados (clientes, produtos e pedidos) são armazenados apenas em memória (arrays em tempo de execução). Isso significa que, ao reiniciar o servidor, todas as informações são perdidas.

---
## 📁 Estrutura do projeto
```
product-api/
├── 📁 public/
|   ├── index.html
|   ├── style.css
|   └── script.js
├── 📁 src/
|   ├── 📁 config/ 
|   ├── 📁 controllers/
|   ├── 📁 middlewares/   
|   ├── 📁 routes/
|   ├── 📁 services/
|   ├── 📁 swagger/
|   ├── 📁 utils/
|   ├── 📁 validators/
|   ├── app.js
|   └── server.js
├── 📁 tests/
|   ├── 📁 __mocks__
└── └── 📁 routes/

```
---
##   Documentação da API

A API possui documentação interativa gerada com **Swagger**.

- URL: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- Permite testar todos os endpoints:
  - /api/customer
  - /api/product
  - /api/order

A documentação inclui:
- Descrição de cada endpoint
- Parâmetros de entrada (query, body, path)
- Respostas esperadas (códigos HTTP, schema)

---
## ⚡ Scripts de inicialização

### 🚀 Como executar o projeto
1. Instalar dependências:

``` bash
npm install       # instala dependências
```
2. Iniciar o servidor:

``` bash
npm start         # inicia o servidor
```

~~ A interface web `public/index.html` será carregada automaticamente em http://localhost:3000/ ~~ (desatualizado)

~~ A documentação em Swagger estará disponível em http://localhost:3000/api/docs ~~ (desatualizado)

---
## 🧪 Testes

### ⚡ Scripts de teste

``` bash
npm test  # roda testes com Jest + Supertest
```

* Testes de rota com mocks de service
* Cenários de sucesso e erro:

  * GET `/api/product` → 200 e lista de produtos
  * GET `/api/product/:id` → 200, 400 (id inválido), 404 (não encontrado)
  * POST `/api/product` → 201 sucesso, 400 campos inválidos ou faltando
  * PUT `/api/product/:id` → 200 sucesso, 404 não encontrado
  * DELETE `/api/product/:id` → 200 sucesso, 404 não encontrado

**Observação**: Todos os serviços são mockados, permitindo testes **isolados da camada de persistência**.

