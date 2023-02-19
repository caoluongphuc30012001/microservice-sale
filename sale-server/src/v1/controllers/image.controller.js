const imageService = require("../services/image.service");

class ImageController {
  async uploadImage(req, res) {
    try {
      console.log(req.file);
      await imageService.uploadImage(req.file.buffer, (result) => {
        res.status(200).send(result);
      });
    } catch (error) {
      res.status(500).send({
        code: 1,
        message: error.message,
      });
    }
  }

  async deleteImage(req, res) {
    try {
      await imageService.deleteImage(req.body, (result) => {
        res.status(200).send(result);
      });
    } catch (error) {
      res.status(500).send({
        code: 1,
        message: error.message,
      });
    }
  }
}
module.exports = new ImageController();
