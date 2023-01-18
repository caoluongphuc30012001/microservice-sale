const express = require("express");
const categoryController = require("../controllers/category.controller");
const authToken = require("../middlewares/token.middleware");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware");
const router = express.Router();

router.get("/", categoryController.getAllCategory);

router.get("/:id", categoryController.findCategoryId);

router.post(
  "/",
  authToken,
  authorizationAdmin,
  categoryController.createCategory
);

router.put(
  "/",
  authToken,
  authorizationAdmin,
  categoryController.updateCategory
);

router.delete(
  "/",
  authToken,
  authorizationAdmin,
  categoryController.deleteCategory
);

module.exports = router;
