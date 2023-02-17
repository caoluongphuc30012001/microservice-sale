const express = require("express");
const authToken = require("../middlewares/token.middleware");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware");
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

router.put(
  "/update-own-information",
  authToken,
  userController.updateOwnInformation
);

router.post(
  "/get-list-user",
  authToken,
  authorizationAdmin,
  userController.getListUser
);

router.put(
  "/",
  authToken,
  authorizationAdmin,
  userController.updateInformationUser
);

router.delete("/", authToken, authorizationAdmin, userController.deleteUser);

module.exports = router;
