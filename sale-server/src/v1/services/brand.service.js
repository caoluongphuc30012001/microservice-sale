const db = require("../databases/mysql.init.js");

class BrandService {
  async getAllBrand(action) {
    try {
      const getAllBrandQuery = `select id, name from Brand;`;
      db.query(getAllBrandQuery, (err, result) => {
        if (err) action(err.message);
        else action(result);
      });
    } catch (error) {
      action(error.message);
    }
  }

  async createBrand(payload, action) {
    try {
      const newBrand = {
        name: payload.name,
        country: payload.country,
        description: payload.description || "",
      };
      const createBrandQuery = `insert into Brand set ?`;
      db.query(createBrandQuery, [newBrand], (err) => {
        if (err) action(err.message);
        else action("Thêm brand thành công");
      });
    } catch (error) {
      action(error.message);
    }
  }

  async updateBrand(payload, action) {
    try {
      const createBrandQuery = `update Brand set ? where id = ?`;
      db.query(createBrandQuery, [payload, payload.id], (err) => {
        if (err) action(err.message);
        else action("Chỉnh sửa brand thành công");
      });
    } catch (error) {
      action(error.message);
    }
  }

  async deleteBrand(payload, action) {
    try {
      const { id } = payload;
      const deleteBrandQuery = `delete from Brand where id = ?`;
      db.query(deleteBrandQuery, [id], (err) => {
        if (err) action(err.message);
        else action("Xóa brand thành công");
      });
    } catch (error) {
      action(error.message);
    }
  }
}

module.exports = new BrandService();
