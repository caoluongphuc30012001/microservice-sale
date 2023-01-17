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
          req.body.user = result;
          next();
        }
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = authToken;
