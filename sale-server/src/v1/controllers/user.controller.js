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
}

module.exports = new UserController();
