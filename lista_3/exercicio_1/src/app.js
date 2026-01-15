import express from "express";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// UNE FRONT + BACK
app.use(express.static("public"));

// TODAS as rotas da API entram aqui
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
