"use strict";

var db = require('../models/connect');

exports.saveFiles = function _callee(iduser, files, callback) {
  var file1, file2, values, checkCCCD;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (files && files.length == 2) {
            file1 = files[0];
            file2 = files[1];
            values = [iduser, file1.filename, file2.filename, file1.path, file2.path, file1.mimetype];
            checkCCCD = "select * from cccd_images where user_id = ".concat(iduser);
            db.query(checkCCCD, function (error, cccd) {
              if (error) {
                callback(error, null);
              } else {
                if (cccd.rowCount == 0) {
                  var query = "INSERT INTO cccd_images (user_id, front_image_filename, back_image_filename, front_image_path, back_image_path, type)\n                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
                  db.query(query, values, function (error, results) {
                    if (error) {
                      callback(error, null);
                    } else {
                      callback(null, results.rows[0]);
                    }
                  });
                } else {
                  callback(null, 2);
                }
              }
            });
          } else {
            callback(null, 1);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.updateFiles = function _callee2(iduser, files, callback) {
  var file1, file2, values, checkCCCD;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (files && files.length == 2) {
            file1 = files[0];
            file2 = files[1];
            values = [iduser, file1.filename, file2.filename, file1.path, file2.path, file1.mimetype];
            checkCCCD = "select * from cccd_images where user_id = ".concat(iduser);
            db.query(checkCCCD, function (error, cccd) {
              if (error) {
                callback(error, null);
              } else {
                if (cccd.rowCount > 0) {
                  var query = "UPDATE cccd_images SET \n                                front_image_filename = $2, \n                                back_image_filename = $3, \n                                front_image_path = $4, \n                                back_image_path = $5, \n                                type = $6\n                            WHERE \n                                user_id = $1 \n                            RETURNING *;";
                  db.query(query, values, function (error, results) {
                    if (error) {
                      callback(error, null);
                    } else {
                      callback(null, results.rows[0]);
                    }
                  });
                } else {
                  callback(null, 2);
                }
              }
            });
          } else {
            callback(null, 1);
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.viewFiles = function (user_id, callback) {
  var query = "SELECT * FROM cccd_images WHERE user_id = ".concat(user_id);
  db.query(query, function (error, results) {
    if (error) {
      callback(error, null);
    } else {
      if (results.rowCount == 0) {
        callback(null, 1);
      } else {
        var imageData = results.rows[0];
        var data = {
          user_id: imageData.user_id,
          front_image_url: "http://localhost:4000/public/img/".concat(imageData.front_image_filename),
          back_image_url: "http://localhost:4000/public/img/".concat(imageData.back_image_filename),
          type: imageData.type,
          created_at: imageData.created_at
        };
        callback(null, data);
      }
    }
  });
};