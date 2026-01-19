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
      servers: [{ url: "http://localhost:3000" }],

      components: {
        securitySchemes: {
          cookieAuth: {
            type: "apiKey",
            in: "cookie",
            name: "sessionId"
          }
        },

        // ✅ Agora os schemas estão no lugar CERTO
        schemas: {
          Product: {
            type: "object",
            required: ["id", "name", "price"],
            properties: {
              id: {
                type: "number",
                example: 1
              },
              name: {
                type: "string",
                example: "Teclado mecânico"
              },
              price: {
                type: "number",
                example: 250
              }
            }
          },

          Order: {
            type: "object",
            required: ["id", "product_id", "quantity"],
            properties: {
              id: {
                type: "number",
                example: 10
              },
              product_id: {
                type: "number",
                example: 1
              },
              quantity: {
                type: "number",
                example: 2
              }
            }
          },

          User: {
            type: "object",
            required: ["username", "role"],
            properties: {
              username: {
                type: "string",
                example: "elisabeth"
              },
              role: {
                type: "string",
                example: "admin"
              }
            }
          }
        }
      },

      // ✅ Agora o security está no lugar certo
      security: [
        {
          cookieAuth: []
        }
      ]
    },

    apis: ["./src/routes/*.js", "./src/swagger/*.js"]
  };

  const swaggerSpec = swaggerJSDoc(options);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
