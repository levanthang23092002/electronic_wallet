"use strict";

var wallet = require('../services/wallet.service');

exports.viewWallet = function (req, res) {
  var user = req.user;
  var id = user.user.id;
  wallet.viewWallet(id, function (error, results) {
    if (error) {
      res.status(500).json({
        message: "Lỗi Hệ Thống",
        data: null,
        error: error
      });
    } else {
      if (results.length == 0) {
        res.status(400).json({
          message: "Chưa Tạo ví thêm Thông tin cá nhân để tạo ví",
          data: [],
          error: null
        });
      } else {
        res.status(400).json({
          message: "Thành công",
          data: results,
          error: null
        });
      }
    }
  });
};

exports.recharges = function (req, res) {
  var user = req.user;
  var id = user.user.id;
  var _req$body = req.body,
      amount = _req$body.amount,
      description = _req$body.description;
  var values = [amount, description];
  wallet.recharge(id, values, function (error, results) {
    if (error) {
      res.status(500).json({
        message: "Lỗi Hệ Thống",
        data: null,
        error: error
      });
    } else {
      if (results == null) {
        res.status(400).json({
          message: "Chưa Tạo ví thêm Thông tin cá nhân để tạo ví",
          data: [],
          error: null
        });
      } else {
        res.status(200).json({
          message: "Thành công",
          data: results,
          error: null
        });
      }
    }
  });
};

exports.trasaction = function (req, res) {
  var user = req.user;
  var id = user.user.id;
  var _req$body2 = req.body,
      soTaiKhoan = _req$body2.soTaiKhoan,
      transfer = _req$body2.transfer,
      description = _req$body2.description;
  var values = [soTaiKhoan, transfer, description];
  wallet.transaction(id, values, function (error, results) {
    if (error) {
      res.status(500).json({
        message: "Lỗi Hệ Thống",
        data: null,
        error: error
      });
    } else {
      switch (results) {
        case 0:
          res.status(401).json({
            message: "Không Thể chuyển cho chính mình",
            data: [],
            error: null
          });
          break;

        case 1:
          res.status(403).json({
            message: "Số Dư Không Đủ",
            data: [],
            error: null
          });
          break;

        case 2:
          res.status(404).json({
            message: "Tài Khoản gửi đi Không tộn Tại",
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
};

exports.trasactionHistory = function (req, res) {
  var user = req.user;
  var id = user.user.id;
  wallet.transactionHistory(id, function (error, results) {
    if (error) {
      res.status(500).json({
        message: "Lỗi Hệ Thống",
        data: null,
        error: error
      });
    } else {
      switch (results) {
        case 1:
          res.status(400).json({
            message: "Chưa có Tài Khoản",
            data: [],
            error: null
          });
          break;

        case 2:
          res.status(400).json({
            message: "Chưa có giao dịch nào",
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
};

exports.historyDetail = function (req, res) {
  var user = req.user;
  var userId = user.user.id;
  var idtransaction = req.params.idtransaction;
  wallet.HistoryDetail(parseInt(idtransaction), parseInt(userId), function (error, results) {
    if (error) {
      res.status(500).json({
        message: "Lỗi Hệ Thống",
        data: null,
        error: error
      });
    } else {
      if (results == null) {
        res.status(400).json({
          message: "Không có mã giao dịch này",
          data: [],
          error: null
        });
      } else {
        res.status(200).json({
          message: "Thành Công",
          data: results,
          error: null
        });
      }
    }
  });
};