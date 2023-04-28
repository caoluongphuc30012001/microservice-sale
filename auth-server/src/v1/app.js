const express = require("express");
const authRouter = require("./routers/auth.router.js");
const googleRouter = require("./routers/google.router.js")
require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const session = require("express-session")
const passport = require("passport");

require("./utils/passport.js");


const app = express();
//init middlewares
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
);

app.use(helmet());

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
//use cookie-session

app.use(
	session({ secret: 'microsale', resave: false, saveUninitialized: true })
);

//app use passport

app.use(passport.initialize( ));
app.use(passport.session())

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
//google auth router

app.use("/auth",googleRouter)




module.exports = app;
