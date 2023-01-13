const app = require("./src/app");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    method: "GET,PUT,PATCH,POST,DELETE",
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
