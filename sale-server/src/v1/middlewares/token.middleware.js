const jsonwebtoken = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    await jsonwebtoken.verify(
      token,
      process.env.JWT_TOKEN_SECRET,
      (error, result) => {
        if (error) res.status(401).send(error);
        else {
          if (result.isActive) {
            req.body.user = result;
            next();
          } else {
            res.status(403).send({
              code: 1,
              message: "Tài khoản chưa được xác thực",
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = authToken;
