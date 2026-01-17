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
└── src/
    ├── app.js
    ├── middlewares/    |
    ├── routes/
    ├── controllers/
    ├── services/
    ├── validators/
    └── public/
        ├── index.html
        ├── style.css
        └── script.js
└── tests/
    ├── __mocks__
    └── routes/

```
## ⚡ Scripts
``` bash
npm install       # instala dependências
npm start         # inicia o servidor
npm test          # roda testes com Jest + Supertest
```
A página `public/index.html` será carregada automaticamente em: 

```bash
http://localhost:3000/
```
---
## 🧪 Testes

* Testes de rota com mocks de service
* Cenários de sucesso e erro:

  * GET `/api/product` → 200 e lista de produtos
  * GET `/api/product/:id` → 200, 400 (id inválido), 404 (não encontrado)
  * POST `/api/product` → 201 sucesso, 400 campos inválidos ou faltando
  * PUT `/api/product/:id` → 200 sucesso, 404 não encontrado
  * DELETE `/api/product/:id` → 200 sucesso, 404 não encontrado

**Observação**: Todos os serviços são mockados, permitindo testes **isolados da camada de persistência**.
