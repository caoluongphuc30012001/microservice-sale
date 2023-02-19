const db = require("../databases/mysql.init");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sender = require("../rabbitmq/sender");

class AuthService {
  //service of controllers

  async register(userPayload, action) {
    try {
      const { email, password, fullName } = userPayload;
      let hashPassword = await bcrypt.hash(password, 10);
      const registerQuery = `insert into User(email, password, fullName) values('${email}','${hashPassword}','${fullName}');`;

      db.query(registerQuery, async (err) => {
        if (err)
          action({
            code: 1,
            data: err.message,
          });
        else {
          const verifyToken = await this.createTokenVerify({ email, password });
          const message = JSON.stringify({
            email: email,
            message: `
            Chào mừng bạn đến với website bán hàng của chúng thôi. Quý khách cần xác thực email trước khi tiến hành mua hàng ở website chúng tôi. Để xác thực email quý khách vui lòng bấm vào: http://localhost:3000/v1/api/auth/verify/${verifyToken}`,
          });
          await sender("send_email", "verify_account", message);
          action({
            code: 0,
            data: "I send you email to verify your email",
          });
        }
      });
    } catch (error) {
      action({ code: 1, data: error.message });
    }
  }

  async login({ email, password }, action) {
    try {
      const loginQuery = `select * from User where email=?;`;
      db.query(loginQuery, [email], async (err, result) => {
        if (err)
          action({
            code: 1,
            data: err.message,
          });
        else if (result.length) {
          const user = result.pop();
          const checkPassword = await bcrypt.compare(password, user.password);
          if (checkPassword) {
            const result = await this.createTokenLogin(user);
            action({
              code: 0,
              data: result,
            });
          } else
            action({
              code: 1,
              data: "Mật khẩu không đúng",
            });
        } else {
          action({
            code: 1,
            data: "Email của bạn không đúng",
          });
        }
      });
    } catch (error) {
      action({ code: 1, data: error.message });
    }
  }

  async refreshToken(refreshToken, action) {
    try {
      const payload = await jsonwebtoken.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET
      );

      const result = await this.createTokenLogin(payload);

      action({
        code: 0,
        data: result,
      });
    } catch (error) {
      action({ code: 201, data: error.message });
    }
  }

  async verify(verifyToken, action) {
    try {
      await jsonwebtoken.verify(
        verifyToken,
        process.env.JWT_TOKEN_VERIFY_SECRET,
        (err, result) => {
          if (err)
            action({
              code: 1,
              data: err.message,
            });
          else {
            const { email } = result;
            const verifyQuery = `update User set isActive=true where email = ?`;

            db.query(verifyQuery, [email], (err) => {
              if (err)
                action({
                  code: 1,
                  data: err.message,
                });
              else
                action({
                  code: 0,
                  data: "Xác thực tài khoản thành công",
                });
            });
          }
        }
      );
    } catch (error) {
      action({ code: 1, data: error.message });
    }
  }

  async forgotPassword(payload, action) {
    try {
      const { email } = payload;
      const forgotPasswordQuery = `select password from User where email = ?`;
      db.query(forgotPasswordQuery, [email], async (err, result) => {
        if (err)
          action({
            code: 1,
            data: err.message,
          });
        else if (result.length <= 0)
          action({
            code: 1,
            data: "Email chưa đăng kí tài khoản",
          });
        else {
          const password = result[0].password;
          const message = JSON.stringify({
            email: email,
            message: `
            Mật khẩu của bạn là ${bcrypt.getRounds(password)}}`,
          });
          await sender("send_email", "forgot-password", message);
          action({
            code: 0,
            data: "I send your password to your email",
          });
        }
      });
    } catch (error) {
      action({ code: 1, data: error.message });
    }
  }

  //Function to create token and refresh token

  async createTokenLogin(payload) {
    try {
      const payloadToken = {
        id: payload.id,
        email: payload.email,
        role: payload.role,
        isActive: payload.isActive,
      };
      const accessToken = jsonwebtoken.sign(
        payloadToken,
        process.env.JWT_TOKEN_SECRET,
        {
          expiresIn: "5m",
        }
      );
      const refreshToken = jsonwebtoken.sign(
        payloadToken,
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {
          expiresIn: "10m",
        }
      );
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      return error.message;
    }
  }

  async createTokenVerify(payload) {
    try {
      const payloadToken = {
        password: payload.password,
        email: payload.email,
      };

      const tokenVerify = await jsonwebtoken.sign(
        payloadToken,
        process.env.JWT_TOKEN_VERIFY_SECRET
      );
      return tokenVerify;
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = new AuthService();
