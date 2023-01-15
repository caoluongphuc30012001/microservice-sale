const app = require("./src/v1/app");

const cors = require("cors");

const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
    method: "GET,PUT,PATCH,POST,DELETE",
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
