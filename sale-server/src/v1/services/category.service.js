const db = require("../databases/mysql.init");

class CategoryService {
  async createCategory({ name, description = "" }, action) {
    try {
      const createQuery = `insert into Category set ?;`;
      db.query(createQuery, [{ name, description }], (error, result) => {
        if (error) action(error.message);
        else action("Thêm category thành công");
      });
    } catch (error) {
      action(error.message);
    }
  }

  async getAllCategory(action) {
    try {
      const getAllBrandQuery = `select id,name,description from Category;`;
      db.query(getAllBrandQuery, (err, result) => {
        if (err) action(err.message);
        else action(result);
      });
    } catch (error) {
      action(error.message);
    }
  }

  async findCategoryById({ id }, action) {
    try {
      const findCategoryByIdQuery = `select * from Category where id = ?;`;
      db.query(findCategoryByIdQuery, [id], (err, result) => {
        if (err) action(err.message);
        else action(result[0]);
      });
    } catch (error) {
      action(error.message);
    }
  }

  async updateCategory(payload, action) {
    try {
      delete payload.user;
      const updateCategoryQuery = `update Category set ? where id = ?;`;
      db.query(updateCategoryQuery, [payload, payload.id], (err) => {
        if (err) action(err.message);
        else action("Chỉnh sửa category thành công");
      });
    } catch (error) {
      action(error.message);
    }
  }

  async deleteCategory({ id }, action) {
    try {
      const deleteCategoryQuery = `delete from Category where id = ?;`;
      db.query(deleteCategoryQuery, [id], (err, result) => {
        if (err) action(err.message);
        else action("Xóa category thành công");
      });
    } catch (error) {
      action(error.message);
    }
  }
}

module.exports = new CategoryService();
