const multer = require("multer");
const ApiError = require("../utils/apiErrors");

const multerFiltering = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    return cb(new ApiError("Format Image Tidak Sesuai", 400));
  }
};

const uploader = multer({
  fileFilter: multerFiltering,
});

module.exports = uploader;
