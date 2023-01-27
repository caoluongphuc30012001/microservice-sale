const express = require("express");
const categoryController = require("../controllers/category.controller");
const authToken = require("../middlewares/token.middleware");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware");
const router = express.Router();

/**
 *  @swagger
 *  /category:
 *    get:
 *      summary: Lấy danh sách category
 *      tags: [Category]
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

router.get("/", categoryController.getAllCategory);

router.get("/:id", categoryController.findCategoryId);

/**
 *  @swagger
 *  /category:
 *    post:
 *      summary: Tạo category mới
 *      tags: [Category]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                name:
 *                  type: string
 *                  description: Tên brand
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

router.post(
  "/",
  authToken,
  authorizationAdmin,
  categoryController.createCategory
);

/**
 *  @swagger
 *  /category:
 *    put:
 *      summary: Cập nhật thông tin category
 *      tags: [Category]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                name:
 *                  type: string
 *                  description: Tên brand
 *                description:
 *                  type: string
 *                  description: Mô tả
 *                id:
 *                  type: number
 *                  description: id category
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

router.put(
  "/",
  authToken,
  authorizationAdmin,
  categoryController.updateCategory
);

/**
 *  @swagger
 *  /category:
 *    delete:
 *      summary: Xóa 1 vategory
 *      tags: [Category]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                id:
 *                  type: string
 *                  description: Id category
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

router.delete(
  "/",
  authToken,
  authorizationAdmin,
  categoryController.deleteCategory
);

module.exports = router;
