const productService = require("../services/product.service");

class ProductController {
  async createProduct(req, res) {
    try {
      await productService.createProduct(req.body, (result) => {
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

  async updateProduct(req, res) {
    try {
      await productService.updateProduct(req.body, (result) => {
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

  async getAllProduct(req, res) {
    try {
      await productService.getAllProduct((result) => {
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

  async findProductById(req, res) {
    try {
      await productService.findProductById({ id: req.params.id }, (result) => {
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

  async deleteProduct(req, res) {
    try {
      await productService.deleteProduct(req.body, (result) => {
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

module.exports = new ProductController();
