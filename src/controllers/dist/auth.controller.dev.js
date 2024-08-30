"use strict";

var auth = require('../services/auth.service');

exports.register = function (req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;
  var values = [email, password];
  auth.register(values, function (err, result) {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Lỗi Hệ Thống',
        data: {},
        error_code: err
      });
    } else if (result === 0) {
      res.status(401).json({
        success: true,
        message: 'Đăng kí thất bại ',
        data: {},
        error_code: null
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Đăng kí Thành Công',
        data: result,
        error_code: null
      });
    }
  });
};

exports.login = function (req, res) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;
  var values = [email, password];
  auth.login(values, function (err, result) {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Lỗi Hệ Thống',
        data: {},
        error_code: err
      });
    } else if (result === 0) {
      res.status(401).json({
        success: true,
        message: 'Đăng nhập thất bại ',
        data: {},
        error_code: null
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Đăng nhập Thành Công',
        data: result,
        error_code: null
      });
    }
  });
};