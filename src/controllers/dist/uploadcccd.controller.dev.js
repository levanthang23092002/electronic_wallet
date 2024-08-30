"use strict";

var upload = require('../services/uploadcccd.service');

exports.uploadImages = function _callee(req, res) {
  var user, iduser, files;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            user = req.user;
            iduser = user.user.id;
            files = req.files;
            upload.saveFiles(iduser, files, function (error, results) {
              if (error) {
                res.status(500).json({
                  message: 'Error uploading files',
                  data: null,
                  error: error
                });
              } else {
                switch (results) {
                  case 1:
                    res.status(403).json({
                      message: "Bạn Cần Tải 2 Hình ảnh CCCD mặt trước và sau",
                      data: [],
                      error: null
                    });
                    break;

                  case 2:
                    res.status(404).json({
                      message: "Đã Tồn Tại Hình Ảnh CCCD",
                      data: [],
                      error: null
                    });
                    break;

                  default:
                    res.status(200).json({
                      message: "Thành Công",
                      data: results,
                      error: null
                    });
                    break;
                }
              }
            });
          } catch (error) {
            res.status(501).json({
              message: 'Error uploading files',
              error: error
            });
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.updateImages = function _callee2(req, res) {
  var user, iduser, files;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {
            user = req.user;
            iduser = user.user.id;
            files = req.files;
            upload.updateFiles(iduser, files, function (error, results) {
              if (error) {
                res.status(500).json({
                  message: 'Error uploading files',
                  data: null,
                  error: error
                });
              } else {
                switch (results) {
                  case 1:
                    res.status(403).json({
                      message: "Bạn Cần Tải 2 Hình ảnh CCCD mặt trước và sau",
                      data: [],
                      error: null
                    });
                    break;

                  case 2:
                    res.status(404).json({
                      message: "Hiện Tại chưa có CCCD",
                      data: [],
                      error: null
                    });
                    break;

                  default:
                    res.status(200).json({
                      message: "Thành Công",
                      data: results,
                      error: null
                    });
                    break;
                }
              }
            });
          } catch (error) {
            res.status(501).json({
              message: 'Error uploading files',
              error: error
            });
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.ViewCCCD = function _callee3(req, res) {
  var user, iduser;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            user = req.user;
            iduser = user.user.id;
            upload.viewFiles(iduser, function (error, results) {
              if (error) {
                res.status(500).json({
                  message: 'Error uploading files',
                  data: null,
                  error: error
                });
              } else {
                switch (results) {
                  case 1:
                    res.status(404).json({
                      message: "Không Tồn Tại Hình Ảnh CCCD",
                      data: [],
                      error: null
                    });
                    break;

                  default:
                    res.status(200).json({
                      message: "Thành Công",
                      data: results,
                      error: null
                    });
                    break;
                }
              }
            });
          } catch (error) {
            res.status(501).json({
              message: 'Error uploading files',
              error: error
            });
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};