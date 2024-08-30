"use strict";

var db = require('../models/connect_db');

var auth = {
  register: function register(data, callback) {
    try {
      var query = "insert into accounts (email, password)";
      db.query(data, query, function (error, results) {
        if (error) {
          callback(error, null);
        } else {
          callback(null, results.rows);
        }
      });
    } catch (error) {
      callback(error, null);
    }
  }
};
module.exports = auth;