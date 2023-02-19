const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "ddmtofsim",
  api_key: "691445755366345",
  api_secret: "dLQPkMIRJlb-mAGm_LjAQa6Gz1s",
});

module.exports = cloudinary;
