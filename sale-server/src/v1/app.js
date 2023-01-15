const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Api for sale backend",
      version: "1.0.0",
      description:
        "This is list of Sale Back end's API . Which use nodejs, jwt, mysql",
      termsOfService: "http://swagger.io/terms/",
      contact: {
        email: "phuccao.30012001@gmail.com",
      },
    },
    servers: [{ url: `http://localhost:${PORT}/v1/api` }],
  },
  apis: ["src/v1/routers/*.js"],
};

const specs = swaggerJsdoc(options);

app.use("/v1/api/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

module.exports = app;
