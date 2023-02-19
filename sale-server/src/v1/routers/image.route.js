const router = require("express").Router();

const imageController = require("../controllers/image.controller");
const authToken = require("../middlewares/token.middleware");
const multer = require("multer");
const multerUpload = multer();

router.post(
  "/upload-image",
  multerUpload.single("file"),
  imageController.uploadImage
);

router.delete("/delete-image", imageController.deleteImage);
module.exports = router;
