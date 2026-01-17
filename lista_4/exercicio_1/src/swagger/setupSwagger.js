import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const setupSwagger = (app) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Customer, Product, Order API",
        version: "1.0.0",
        description: "API RESTful para gerenciamento de clientes, produtos e pedidos"
      },
      servers: [{ url: "http://localhost:3000" }]
    },
    apis: ["./src/routes/*.js", "./src/swagger/*.js"], // lê seus comentários JSDoc
  };

  const swaggerSpec = swaggerJSDoc(options);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
