import 'dotenv/config';
import app from "./app.js";

process.on('unhandledRejection', (err) => {
  console.error("ERRO NÃO TRATADO:", err);
});

process.on('uncaughtException', (err) => {
  console.error("EXCEÇÃO NÃO CAPTURADA:", err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
