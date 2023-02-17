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

  async updateOwnInformation(payload, action) {
    try {
      delete payload.password;
      delete payload.role;
      delete payload.isActive;
      delete payload.email;
      delete payload.id;
      const id = payload.user.id;
      delete payload.user;
      console.log(payload);
      const updateOwnInformationQuery = `update User set ? where id = ?;`;
      db.query(updateOwnInformationQuery, [payload, id], (err) => {
        if (err)
          action({
            code: 1,
            data: err.message,
          });
        else
          action({
            code: 0,
            data: "Cập nhật thành công",
          });
      });
    } catch (error) {
      action({
        code: 1,
        data: error.message,
      });
    }
  }

  async getListUser(payload, action) {
    try {
      const { search } = payload;
      const getListUserQuery = `select id,fullName,birthday,avatar,phoneNumber, province, district, ward, street, isActive, role,email from User where fullName like "%${search}%";`;
      db.query(getListUserQuery, (err, result) => {
        if (err)
          action({
            code: 1,
            data: err.message,
          });
        else
          action({
            code: 0,
            data: result,
          });
      });
    } catch (error) {
      action({
        code: 1,
        data: error.message,
      });
    }
  }

  async updateInformationUser(payload, action) {
    try {
      delete payload.password;
      delete payload.email;
      delete payload.user;
      const updateInformationUserQuery = "update User set ? where id = ?;";
      db.query(
        updateInformationUserQuery,
        [payload, payload.id],
        (err, result) => {
          if (err)
            action({
              code: 1,
              data: err.message,
            });
          else
            action({
              code: 0,
              data: "Cập nhật thông tin người dùng thành công",
            });
        }
      );
    } catch (error) {
      action({
        code: 1,
        data: error.message,
      });
    }
  }

  async deleteUser(payload, action) {
    try {
      const { id } = payload;
      const deleteUserQuery = `delete from User where id =?;`;
      db.query(deleteUserQuery, [id], (err, result) => {
        if (err)
          action({
            code: 1,
            data: err.message,
          });
        else
          action({
            code: 0,
            data: "Xóa tài khoản thành công",
          });
      });
    } catch (error) {
      action({
        code: 1,
        data: error.message,
      });
    }
  }
}
module.exports = new UserService();
