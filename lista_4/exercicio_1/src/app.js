import express from "express";
import routes from "./routes/index.js";
import helmet from "helmet";
import cors from "cors";
import { setupSwagger } from "./swagger/setupSwagger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import loggerMiddleware from "./middlewares/loggerMiddleware.js";

const app = express();

// Recebe JSON
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  app.use(loggerMiddleware);
}

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

// Configura o Swagger
setupSwagger(app);

// Middleware de erros deve vir por último
app.use(errorHandler);

export default app;