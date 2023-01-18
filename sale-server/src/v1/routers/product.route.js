const express = require("express");
const productController = require("../controllers/product.controller");
const authToken = require("../middlewares/token.middleware.js");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware.js");
const router = express.Router();

router.post(
  "/",
  authToken,
  authorizationAdmin,
  productController.createProduct
);

router.put("/", authToken, authorizationAdmin, productController.updateProduct);

router.get("/", productController.getAllProduct);

router.get("/:id", productController.findProductById);

router.delete(
  "/",
  authToken,
  authorizationAdmin,
  productController.deleteProduct
);

module.exports = router;
