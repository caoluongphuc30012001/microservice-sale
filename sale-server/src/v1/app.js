const express = require("express");
const brandRouter = require("./routers/brand.route");
const categoryRouter = require("./routers/category.route");
const productRouter = require("./routers/product.route");
const userRouter = require("./routers/user.route");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: "*",
    method: "GET,PUT,PATCH,POST,DELETE",
  })
);

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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: {
      bearerAuth: [],
    },
    servers: [{ url: `http://localhost:${PORT}/v1/api` }],
  },
  apis: ["src/v1/routers/*.js"],
};

const specs = swaggerJsdoc(options);

app.use("/v1/api/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//app use brand router

app.use("/v1/api/brand", brandRouter);

//app use category router

app.use("/v1/api/category", categoryRouter);

//app use product router

app.use("/v1/api/product", productRouter);

// app use user router
app.use("/v1/api/user", userRouter);

app.use("/", (req, res) => {
  res.send("Welcome to my application");
});

module.exports = app;
