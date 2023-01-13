const express = require("express");
const authRouter = require("./v1/routers/auth.router.js");
require("dotenv").config();
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
      title: "Library Api for auth backend",
      version: "1.0.0",
      description:
        "This is list of Auth Back end's API . Which use nodejs, jwt, mysql",
      termsOfService: "http://swagger.io/terms/",
      contact: {
        email: "phuccao.30012001@gmail.com",
      },
    },
    servers: [{ url: "http://localhost:3000/v1/api" }],
  },
  apis: ["src/v1/routers/*.js"],
};

const specs = swaggerJsdoc(options);

app.use("/v1/api/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//auth router
app.use("/v1/api/auth", authRouter);

module.exports = app;
