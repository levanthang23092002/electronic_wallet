"use strict";

var db = require('../models/connect');

var jwt = require('jsonwebtoken');

var auth = {
  register: function register(data, callback) {
    try {
      var query = "INSERT INTO accounts (email, password) VALUES ($1, $2) RETURNING id, email,password,created_at";
      db.query(query, data, function (error, results) {
        if (error) {
          console.log(error);
          callback(error, null);
        } else {
          console.log(results);
          callback(null, results.rows);
        }
      });
    } catch (error) {
      callback(error, null);
    }
  },
  login: function login(data, callback) {
    try {
      var query = 'SELECT * FROM accounts WHERE email = $1 and password = $2';
      db.query(query, data, function (error, results) {
        if (error) {
          callback(error, null);
        }

        if (data === null || Array.isArray(data) && data[0] === null || data[1] === null) {
          callback(null, 1);
        } else {
          if (results.rows.length === 0) {
            callback(null, 0);
          } else {
            var user = results.rows[0]; // Tạo mã JWT

            var token = jwt.sign({
              user: user
            }, process.env.JWT_SECRET, {
              expiresIn: '1h'
            }); // Gửi mã JWT và thông tin người dùng

            callback(null, {
              token: token,
              user: user
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
      callback(error, null);
    }
  }
};
module.exports = auth;