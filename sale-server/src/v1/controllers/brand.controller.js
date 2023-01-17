const brandService = require("../services/brand.service");

class BrandController {
  async createBrand(req, res) {
    try {
      await brandService.createBrand(req.body, (result) => {
        res.status(200).send({
          code: 0,
          data: result,
        });
      });
    } catch (error) {
      res.status(500).send({
        code: 1,
        error: error.message,
      });
    }
  }

  async getAllBrand(req, res) {
    try {
      await brandService.getAllBrand((result) => {
        res.status(200).send({
          code: 0,
          data: result,
        });
      });
    } catch (error) {
      res.status(500).send({
        code: 1,
        error: error.message,
      });
    }
  }

  async updateBrand(req, res) {
    try {
      await brandService.updateBrand(req.body, (result) => {
        res.status(200).send({
          code: 0,
          data: result,
        });
      });
    } catch (error) {
      res.status(500).send({
        code: 1,
        error: error.message,
      });
    }
  }

  async deleteBrand(req, res) {
    try {
      await brandService.deleteBrand(req.body, (result) => {
        res.status(200).send({
          code: 0,
          data: result,
        });
      });
    } catch (error) {
      res.status(500).send({
        code: 1,
        error: error.message,
      });
    }
  }
}

module.exports = new BrandController();
