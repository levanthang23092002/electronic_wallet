"use strict";

var multer = require('multer');

var path = require('path');

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'public/img/'); // Thư mục lưu trữ file upload
  },
  filename: function filename(req, file, cb) {
    var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, "".concat(file.fieldname, "-").concat(uniqueSuffix).concat(path.extname(file.originalname)));
  }
});
var upload = multer({
  storage: storage
});
module.exports = upload.array('images', 2);