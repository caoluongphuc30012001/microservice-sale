const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

/**
 *  @swagger
 *  /auth/register:
 *    post:
 *      summary: Đăng kí tài khoản
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                email:
 *                  type: string
 *                  description: Email người dùng
 *                password:
 *                  type: string
 *                  description: mật khẩu
 *                fullName:
 *                  type: string
 *                  description: Tên người dùng
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                properties:
 *                  code:
 *                    type: number
 *                    description: Mã lỗi
 *                  data:
 *                    type: string
 *                    description: Thông tin back end trả về
 *
 */

router.post("/register", authController.register);

/**
 *  @swagger
 *  /auth/login:
 *    post:
 *      summary: Đăng nhập
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                email:
 *                  type: string
 *                  description: Email người dùng
 *                password:
 *                  type: string
 *                  description: mật khẩu
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                properties:
 *                  code:
 *                    type: number
 *                    description: Mã lỗi
 *                  data:
 *                    type: string
 *                    description: Thông tin back end trả về
 *
 */

router.post("/login", authController.login);

/**
 *  @swagger
 *  /auth/refresh-token:
 *    post:
 *      summary: Refresh token
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                refreshToken:
 *                  type: string
 *                  description: Refresh token
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                properties:
 *                  code:
 *                    type: number
 *                    description: Mã lỗi
 *                  data:
 *                    type: string
 *                    description: Thông tin back end trả về
 *
 */

router.post("/refresh-token", authController.refreshToken);

router.get("/verify/:verifyToken", authController.verify);

router.get("/", (req, res) => {
  res.status(200).send("Welcomes to the app!");
});

router.post("/forgot-password", authController.forgotPassword);



module.exports = router;
