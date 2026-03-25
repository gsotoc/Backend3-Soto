import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Ecommerce API",
      description: "Documentación de la API del proyecto",
      version: "1.0.0"
    }
  },
  apis: ["./src/routes/*.js"] 
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export default swaggerSpecs;