const express = require("express");
const productController = require("../controllers/product.controller");
const authToken = require("../middlewares/token.middleware.js");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware.js");
const router = express.Router();

/**
 *  @swagger
 *  /product:
 *    post:
 *      summary: Tạo product mới
 *      tags: [Product]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                categoryId:
 *                  type: number
 *                  description: Loại category
 *                name:
 *                  type: string
 *                  description: Tên sản phẩm
 *                price:
 *                  type: number
 *                  description: Giá cả
 *                quantity:
 *                  type: string
 *                  description: Số lượng sản phẩm
 *                image:
 *                  type: string
 *                  description: Địa chỉ hình ảnh
 *                description:
 *                  type: string
 *                  description: Mô tả sản phẩm
 *                brandId:
 *                  type: number
 *                  description: id của brand
 *                code:
 *                  type: number
 *                  description: mã code
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
  productController.createProduct
);

/**
 *  @swagger
 *  /product:
 *    put:
 *      summary: Tạo product mới
 *      tags: [Product]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                id:
 *                  type: number
 *                  description: Id sản phẩm
 *                categoryId:
 *                  type: number
 *                  description: Loại category
 *                name:
 *                  type: string
 *                  description: Tên sản phẩm
 *                price:
 *                  type: number
 *                  description: Giá cả
 *                quantity:
 *                  type: string
 *                  description: Số lượng sản phẩm
 *                image:
 *                  type: string
 *                  description: Địa chỉ hình ảnh
 *                description:
 *                  type: string
 *                  description: Mô tả sản phẩm
 *                brandId:
 *                  type: number
 *                  description: id của brand
 *                code:
 *                  type: number
 *                  description: mã code
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

router.put("/", authToken, authorizationAdmin, productController.updateProduct);

router.get("/", productController.getAllProduct);

/**
 *  @swagger
 *  /product:
 *    get:
 *      summary: Lấy danh sách product
 *      tags: [Product]
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

router.get("/:id", productController.findProductById);

/**
 *  @swagger
 *  /product:
 *    delete:
 *      summary: Xóa 1 product
 *      tags: [Product]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                id:
 *                  type: string
 *                  description: Id product
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
  productController.deleteProduct
);

module.exports = router;
