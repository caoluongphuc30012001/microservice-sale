const express = require("express");
const brandController = require("../controllers/brand.controller");
const authToken = require("../middlewares/token.middleware.js");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware.js");

const router = express.Router();

router.get("/", brandController.getAllBrand);

router.post("/", authToken, authorizationAdmin, brandController.createBrand);

router.put("/", authToken, authorizationAdmin, brandController.updateBrand);

router.delete("/", authToken, authorizationAdmin, brandController.deleteBrand);
module.exports = router;
