"use strict";

var user = require('../services/user.service');

exports.addInfo = function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      gender = _req$body.gender,
      phone = _req$body.phone,
      address = _req$body.address,
      born = _req$body.born;
  var users = req.user;
  var values = [name, gender, phone, address, born];
  var id = users.user.id;
  user.addInfo(id, values, function (error, results) {
    if (error) {
      res.status(500).json({
        message: "Lỗi Hệ Thống",
        error: error
      });
    } else {
      res.status(200).json({
        message: "Đã Thêm Thông tin thành công",
        data: results
      });
    }
  });
};

exports.updateInfo = function (req, res) {
  var _req$body2 = req.body,
      name = _req$body2.name,
      gender = _req$body2.gender,
      phone = _req$body2.phone,
      address = _req$body2.address,
      born = _req$body2.born;
  var users = req.user;
  var values = [name, gender, phone, address, born];
  var id = users.user.id;
  user.updateInfo(id, values, function (error, results) {
    if (error) {
      res.status(500).json({
        message: "Lỗi Hệ Thống",
        error: error
      });
    } else {
      res.status(200).json({
        message: "Đã update dữ liệu thành công",
        data: results
      });
    }
  });
};

exports.getInfo = function (req, res) {
  var users = req.user;
  var id = users.user.id;
  user.getInfo(id, function (error, results) {
    if (error) {
      res.status(500).json({
        message: "Lỗi Hệ Thống",
        data: null,
        error: error
      });
    } else {
      if (results.length == 0) {
        res.status(400).json({
          message: "bạn chưa thêm Thông tin ",
          data: null,
          error: null
        });
      } else {
        res.status(200).json({
          message: "Thông tin ",
          data: results,
          error: null
        });
      }
    }
  });
};