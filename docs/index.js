import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    info: {
      title: "HoBom Tech Blog API Documents",
      version: "Docs Version: 1.0.0",
      description: "HoBom BackEnd with Node Express",
    },
  },
  apis: ["../src/routes/*.js", "./*"],
};

const specs = swaggerJSDoc(options);

export { swaggerUi, specs };
