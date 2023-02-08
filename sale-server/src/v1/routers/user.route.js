const express = require("express");
const authToken = require("../middlewares/token.middleware");
const userController = require("../controllers/user.controller");

const router = express.Router();

/**
 *  @swagger
 *  /user/get-own-information:
 *    get:
 *      summary: Lấy danh sách product
 *      tags: [User]
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
 */

router.get("/get-own-information", authToken, userController.getOwnInformation);

module.exports = router;
