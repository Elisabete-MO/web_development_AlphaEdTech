import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import loggerMiddleware from "./middlewares/loggerMiddleware.js";
import { setupSwagger } from "./swagger/setupSwagger.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// Recebe JSON
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  app.use(loggerMiddleware);
}

// Parse cookies
app.use(cookieParser());

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
    credentials: true                    // permite cookies
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