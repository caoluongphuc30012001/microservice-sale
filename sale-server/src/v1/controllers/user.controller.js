const userService = require("../services/user.service");

class UserController {
  async getOwnInformation(req, res) {
    try {
      await userService.getOwnInformation(req.body.user, (result) => {
        res.status(200).send({
          code: 0,
          data: result,
        });
      });
    } catch (error) {
      res.status(500).send({
        code: 1,
        message: error.message,
      });
    }
  }

  async updateOwnInformation(req, res) {
    try {
      await userService.updateOwnInformation(req.body, (result) => {
        res.status(200).send(result);
      });
    } catch (error) {
      res.status(500).send({
        code: 1,
        message: error.message,
      });
    }
  }

  async getListUser(req, res) {
    try {
      await userService.getListUser(req.body, (result) => {
        res.status(200).send(result);
      });
    } catch (error) {
      res.status(500).send({
        code: 1,
        message: error.message,
      });
    }
  }

  async updateInformationUser(req, res) {
    try {
      await userService.updateInformationUser(req.body, (result) => {
        res.status(200).send(result);
      });
    } catch (error) {
      res.status(500).send({
        code: 1,
        message: error.message,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      await userService.deleteUser(req.body, (result) => {
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

module.exports = new UserController();
