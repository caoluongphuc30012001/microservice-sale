const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

//Hàm này sử dụng để ghi thông tin người dùng vào session
passport.serializeUser((user, done) => {
  done(null, user);
});

//Hàm này sử dụng để lấy thông tin đăng nhập người dùng từ session
passport.deserializeUser((user, done) => {
  console.log("2");
  done(null, user);
});
