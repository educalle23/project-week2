const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Perfume Shop API",
      version: "1.0.0",
      description:
        "REST API for perfume shop management - Clients and Perfumes",
      contact: {
        name: "API Support",
        email: "[email protected]",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://project-week2.onrender.com",
        description: "Production server",
      },
    ],
    tags: [
      {
        name: "Parfums",
        description: "CRUD operations for perfumes",
      },
      {
        name: "Clients",
        description: "CRUD operations for clients",
      },
    ],
  },
  apis: ["./routes/*.js"], // Asegúrate que esta ruta sea correcta
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
