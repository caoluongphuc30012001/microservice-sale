const db = require("../databases/mysql.init");

class ProductDetailService {
  async createProductDetail(payload, action) {
    try {
      const newProductDetail = {
        productId: payload.productId,
        description: payload.description || "",
        brandId: payload.brandId,
        code: payload.code,
      };
      const createProductDetailQuery = `insert into ProductDetail set?`;

      db.query(createProductDetailQuery, [newProductDetail], (err) => {
        if (err) action(err.message);
        else action(true);
      });
    } catch (error) {
      action(error.message);
    }
  }

  async deleteProductDetail(payload, action = () => {}) {
    try {
      const id = payload.productId;
      console.log(id);
      const deleteProductDetailQuery = `delete from ProductDetail where productId=?`;
      db.query(deleteProductDetailQuery, [id], (err) => {
        if (err) action(err.message);
        else action(true);
      });
    } catch (error) {
      action(error.message);
    }
  }

  async updateProductDetail(payload, action) {
    try {
      const listField = ["description", "brandId", "code"];
      const productDetail = {};
      listField.forEach((item) => {
        if (payload[item]) productDetail[item] = payload[item];
      });
      const updateProductDetailQuery = `update ProductDetail set ? where productId = ? `;
      db.query(
        updateProductDetailQuery,
        [productDetail, payload.id],
        (err, result) => {
          if (err) action(err.message);
          else action(true);
        }
      );
    } catch (error) {
      action(error.message);
    }
  }
}

module.exports = new ProductDetailService();
