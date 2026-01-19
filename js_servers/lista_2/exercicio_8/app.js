import express from "express";
import productRoutes from "./product_routes.js";

const app = express();
const PORT = 3000;

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

// Rotas da API
app.use("/api/product", productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
