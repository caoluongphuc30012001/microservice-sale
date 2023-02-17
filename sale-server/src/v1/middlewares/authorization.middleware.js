const authorizationAdmin = async (req, res, next) => {
  try {
    const user = req.body.user;
    console.log(user);
    if (user.role === "admin") next();
    else
      res.status(403).send({
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
