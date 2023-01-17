const authorizationAdmin = async (req, res, next) => {
  try {
    const user = req.body.user;
    if (user.role === "admin") next();
    else
      res.status(401).send({
        code: 0,
        message: "You don't have permission to access",
      });
  } catch (error) {
    res.status(error.message);
  }
};

module.exports = {
  authorizationAdmin,
};
