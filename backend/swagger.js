import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "Feedpulse API",
      version: "1.0.0",
      description: "API documentation for my Express.js application",
    },
    servers: [
      {
        url: "http://localhost:8080", // replace with your server URL
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"], // files containing annotations
};

const specs = swaggerJsdoc(options);
export default specs;
