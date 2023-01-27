const express = require("express");
const brandController = require("../controllers/brand.controller");
const authToken = require("../middlewares/token.middleware.js");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware.js");

const router = express.Router();

router.get("/", brandController.getAllBrand);

/**
 *  @swagger
 *  /brand:
 *    post:
 *      summary: Tạo brand mới
 *      tags: [Brand]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                name:
 *                  type: string
 *                  description: Tên brand
 *                country:
 *                  type: string
 *                  description: Nước
 *                description:
 *                  type: string
 *                  description: Mô tả
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

router.post("/", authToken, authorizationAdmin, brandController.createBrand);

/**
 *  @swagger
 *  /brand:
 *    put:
 *      summary: Cập nhật thông tin của brand
 *      tags: [Brand]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                name:
 *                  type: string
 *                  description: Tên brand
 *                country:
 *                  type: string
 *                  description: Nước
 *                description:
 *                  type: string
 *                  description: Mô tả
 *                id:
 *                  type: number
 *                  description: id brand
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

router.put("/", authToken, authorizationAdmin, brandController.updateBrand);
/**
 *  @swagger
 *  /brand:
 *    delete:
 *      summary: Xóa 1 brand
 *      tags: [Brand]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                id:
 *                  type: string
 *                  description: Id brand
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

router.delete("/", authToken, authorizationAdmin, brandController.deleteBrand);
/**
 *  @swagger
 *  /brand:
 *    get:
 *      summary: Lấy danh sách brand
 *      tags: [Brand]
 *      parameters:
 *      - in: path
 *        name: id
 *        type: integer
 *        description: Numeric ID of the user to get
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

router.get("/:brandId", brandController.findBrandId);
module.exports = router;
