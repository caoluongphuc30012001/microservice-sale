const db = require("../databases/mysql.init");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sender = require("../rabbitmq/sender");

class AuthService {
  //service of controllers

  async register(userPayload, action) {
    try {
      await sender(
        "send_email",
        "verify_account",
        "Please verify your account"
      );
      const { email, password, fullName } = userPayload;
      let hashPassword = bcrypt.hash(password, 10);
      const registerQuery = `insert into User(email, password, fullName) values('${email}','${hashPassword}','${fullName}');`;

      db.query(registerQuery, (err) => {
        if (err) action(err.message);
        else action("I send you email to verify your email");
      });
    } catch (error) {
      action(error.message);
    }
  }

  async login({ email, password }, action) {
    try {
      const loginQuery = `select id, password, email, role from User where email=?;`;
      db.query(loginQuery, [email], async (err, result) => {
        if (err) action(err.message);
        else if (result.length) {
          const user = result.pop();
          const checkPassword = await bcrypt.compare(password, user.password);
          if (checkPassword) {
            const payloadToken = {
              id: user.id,
              email: user.email,
              role: user.role,
            };

            const result = await this.createTokenLogin(payloadToken);

            action(result);
          } else action("Mật khẩu không đúng");
        } else {
          action("Email của bạn không đúng");
        }
      });
    } catch (error) {
      action(error.message);
    }
  }

  async refreshToken(refreshToken, action) {
    try {
      const user = await jsonwebtoken.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET
      );

      const payloadToken = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const result = await this.createTokenLogin(payloadToken);

      action(result);
    } catch (error) {
      action(error.message);
    }
  }

  //Function to create token and refresh token

  async createTokenLogin(payload) {
    const accessToken = jsonwebtoken.sign(
      payload,
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: "5m",
      }
    );
    const refreshToken = jsonwebtoken.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: "10m",
      }
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}

module.exports = new AuthService();
