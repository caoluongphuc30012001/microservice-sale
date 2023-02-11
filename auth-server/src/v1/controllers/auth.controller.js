const authService = require("../services/auth.service");

class AuthController {
  async register(req, res) {
    try {
      await authService.register(req.body, (result) => {
        res.status(200).send(result);
      });
    } catch (error) {
      res.status(500).send({
        code: 1,
        error: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      await authService.login(req.body, (result) => {
        res.status(200).send(result);
      });
    } catch (error) {
      res.status(500).send({
        code: 1,
        error: error.message,
      });
    }
  }

  async refreshToken(req, res) {
    try {
      await authService.refreshToken(req.body.refreshToken, (result) => {
        res.status(200).send(result);
      });
    } catch (error) {
      res.status(500).send({
        code: 1,
        error: error.message,
      });
    }
  }

  async verify(req, res) {
    try {
      await authService.verify(req.params.verifyToken, (result) => {
        res.status(200).send(result);
      });
    } catch (error) {
      res.status(500).send({
        code: 1,
        error: error.message,
      });
    }
  }

  async forgotPassword(req, res) {
    try {
      await authService.forgotPassword(req.body, (result) => {
        res.status(200).send(result);
      });
    } catch (error) {
      res.status(500).send({
        code: 1,
        error: error.message,
      });
    }
  }
}

module.exports = new AuthController();
