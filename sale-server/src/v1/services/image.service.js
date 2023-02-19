const cloudinary = require("../databases/cloudinary.init");

class ImageService {
  async uploadImage(payload, action) {
    try {
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (err, result) => {
          if (err) {
            action({
              code: 1,
              data: err.message,
            });
          } else {
            action({
              code: 0,
              data: {
                public_id: result.public_id,
                url: result.url,
              },
            });
          }
        })
        .end(payload);
    } catch (error) {
      action({
        code: 1,
        data: error.message,
      });
    }
  }

  async deleteImage(payload, action) {
    try {
      const { public_id } = payload;
      cloudinary.uploader.destroy(public_id, (err) => {
        if (err) {
          action({
            code: 1,
            data: err.message,
          });
        } else {
          action({
            code: 0,
            data: "Xóa ảnh thành công",
          });
        }
      });
    } catch (error) {
      action({
        code: 1,
        data: error.message,
      });
    }
  }
}

module.exports = new ImageService();
