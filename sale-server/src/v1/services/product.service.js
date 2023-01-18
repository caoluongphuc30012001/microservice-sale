const db = require("../databases/mysql.init");
const productDetailService = require("./productDetail.service");
class ProductService {
  async createProduct(payload, action) {
    try {
      const newProduct = {
        categoryId: payload.categoryId,
        name: payload.name,
        price: payload.price,
        quantity: payload.quantity,
        image: payload.image,
      };

      const createProductQuery = `insert into Product set ?;`;
      db.query(createProductQuery, [newProduct], async (err, result0) => {
        if (err) action(err.message);
        else {
          await productDetailService.createProductDetail(
            { ...payload, productId: result0.insertId },
            async (result1) => {
              if (result1 === true) action("Tạo sản phẩm mới thành công");
              else {
                await this.deleteProduct({ id: result0.insertId });
                action(result1);
              }
            }
          );
        }
      });
    } catch (error) {
      action(error.message);
    }
  }

  async deleteProduct(payload, action = () => {}) {
    try {
      const { id } = payload;
      const deleteProductQuery = `delete from Product where id = ?`;
      productDetailService.deleteProductDetail({ id: id });
      db.query(deleteProductQuery, [id], (err, result) => {
        if (err) action(err.message);
        else action("Xóa sản phẩm thành công");
      });
    } catch (error) {
      action("Xóa sản phẩm thành công");
    }
  }

  async updateProduct(payload, action) {
    try {
      const listField = ["categoryId", "name", "price", "quantity", "image"];
      const product = {};
      listField.forEach((item) => {
        if (payload[item]) product[item] = payload[item];
      });
      console.log(product);
      const updateProductQuery = `update Product set ? where id=?`;
      db.query(
        updateProductQuery,
        [product, payload.id],
        async (err, result) => {
          if (err) action(err.message);
          else {
            await productDetailService.updateProductDetail(
              payload,
              (result) => {
                if (result === true)
                  action("Cập nhật thông tin sản phẩm thành công");
                else action(result);
              }
            );
          }
        }
      );
    } catch (error) {
      action(error.message);
    }
  }

  async getAllProduct(action) {
    try {
      const getAllProductQuery = `select * from Product`;
      db.query(getAllProductQuery, (err, result) => {
        if (err) action(err.message);
        else action(result);
      });
    } catch (error) {
      action(error.message);
    }
  }

  async findProductById(payload, action) {
    try {
      const { id } = payload;
      const getProductByIdQuery = `select * from (select * from Product as p where p.id = ${id}) as p left join ProductDetail as pd on p.id = pd.productId;`;
      db.query(getProductByIdQuery, (err, result) => {
        if (err) action(err.message);
        else action(result[0]);
      });
    } catch (error) {
      action(error.message);
    }
  }
}

module.exports = new ProductService();
