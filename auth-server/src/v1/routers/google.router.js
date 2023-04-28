const express = require("express");
const passport = require("passport");
const googleController = require("../controllers/google.controller");
const router = express.Router();

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login/failed",
  }),
  googleController.googleLogin
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/login/failed", async (req, res) => {
  try {
    console.log("session:", req.session.passport.user.emails);
    res.status(200).send({
      code: 0,
      data: req.user,
    });
  } catch (error) {
    res.status(500).send({
      code: 1,
      error: error.message,
    });
  }
});

module.exports = router;
