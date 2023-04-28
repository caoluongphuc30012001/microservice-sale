const express = require("express");
const passport = require("passport");
const googleController = require("../controllers/google.controller");
const router = express.Router();


router.get("/google/callback",passport.authenticate("google",{
  failureRedirect:"/auth/login/failed"
}),googleController.googleLogin)

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/login/failed",async()=>{
  try {

    res.status(200).send({
      code: 0,
      data:"Đăng nhập thất bại"
    })
    
  } catch (error) {
    res.status(500).send({
      code:1,
      error: error.message
    })
  }
})

module.exports = router;
