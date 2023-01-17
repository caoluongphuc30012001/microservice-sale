const db = require("../databases/mysql.init.js");

class BrandService {
  async getAllBrand(payload, action) {
    try {
      const getAllBrandQuery = `select * from Brand;`;
      db.query(getAllBrandQuery, (err, result) => {
        if (err) action(err.message);
        else action(result);
      });
    } catch (error) {
      action(error.message);
    }
  }
}

module.exports = new BrandService();
