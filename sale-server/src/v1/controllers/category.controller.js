const categoryService = require("../services/category.service");

class CategoryController {
  async getAllCategory(req, res) {
    try {
      await categoryService.getAllCategory((result) => {
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

  async findCategoryId(req, res) {
    try {
      await categoryService.findCategoryById(
        { id: req.params.id },
        (result) => {
          res.status(200).send({
            code: 0,
            data: result,
          });
        }
      );
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async createCategory(req, res) {
    try {
      await categoryService.createCategory(req.body, (result) => {
        res.status(200).send({
          code: 0,
          data: result,
        });
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async updateCategory(req, res) {
    try {
      await categoryService.updateCategory(req.body, (result) => {
        res.status(200).send({
          code: 0,
          data: result,
        });
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deleteCategory(req, res) {
    try {
      await categoryService.deleteCategory(req.body, (result) => {
        res.status(200).send({
          code: 0,
          data: result,
        });
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new CategoryController();
