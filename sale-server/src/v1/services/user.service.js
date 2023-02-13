const db = require("../databases/mysql.init");

class UserService {
  async getOwnInformation(payload, action) {
    try {
      const { id } = payload;
      const getOwnInformationQuery = `select * from User where id=?`;
      db.query(getOwnInformationQuery, [id], (err, result) => {
        if (err) action(err.message);
        else {
          const user = result.pop();
          delete user.password;
          delete user.email;
          action(user);
        }
      });
    } catch (error) {
      action(error.message);
    }
  }
}
module.exports = new UserService();
