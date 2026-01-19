import express from "express";
import path from "path";
import routes from "./routes.js";
import { getDirname } from "./pathUtil.js";

const app = express();
const PORT = 3000;

const __dirname = getDirname(import.meta.url);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Registrar rotas
app.use(routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
