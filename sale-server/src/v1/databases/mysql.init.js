const mysql = require("mysql2");
require("dotenv").config();
let db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: "sale",
});
module.exports = db;
