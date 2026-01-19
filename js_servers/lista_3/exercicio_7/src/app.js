import express from "express";
import routes from "./routes/index.js";
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Recebe JSON
app.use(express.json());

// Segurança com Helmet
app.use(
  helmet({
    frameguard: { action: "deny" },       // ❌ Bloqueia iframes
    contentSecurityPolicy: {              // 🛡️ Permite apenas recursos confiáveis
      directives: {
        defaultSrc: ["'self'"],           // só permite recursos do mesmo domínio
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'"],
        objectSrc: ["'none'"]
      }
    },
    crossOriginEmbedderPolicy: true,      // reforça isolamento de origem
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" }
  })
);

// Bloqueia requisições de outras origens
app.use(
  cors({
    origin: "http://localhost:3000",     // só a origem
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
  })
);

// UNE FRONT + BACK
app.use(express.static("public"));

// TODAS as rotas da API entram aqui
app.use("/api", routes);

// Middleware de erros deve vir por último
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
