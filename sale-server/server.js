const app = require("./src/v1/app");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
