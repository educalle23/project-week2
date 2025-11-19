const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Perfume Shop API",
      version: "1.0.0",
      description: "REST API for perfume shop management",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const docs = swaggerJsDoc(swaggerOptions);
console.log(JSON.stringify(docs, null, 2));
