"use strict";

var db = require('../models/connect');

var user = {
  addInfo: function addInfo(id, data, callback) {
    var query = "select * from users where id = ".concat(id);

    try {
      db.query(query, function (error, results) {
        if (error) {
          callback(error, null);
        } else {
          if (results.rowCount > 0) {
            callback("user đã tồn tại", null);
          } else {
            var add = "INSERT INTO users (id, name, gender, phone, address, born ) VALUES (".concat(id, ", $1 , $2 , $3 , $4 , TO_DATE($5, 'DD/MM/YYYY')) RETURNING name, gender , phone , address , born");
            db.query(add, data, function (error, results) {
              if (error) callback(error, null);else callback(null, results.rows[0]);
            });
          }
        }
      });
    } catch (error) {
      callback(error, null);
    }
  },
  updateInfo: function updateInfo(id, data, callback) {
    var query = "select * from users where id = ".concat(id);

    try {
      db.query(query, function (error, results) {
        if (error) {
          callback(error, null);
        } else {
          if (results.rowCount > 0) {
            var update = "UPDATE users SET  name = $1, gender = $2, phone = $3, address = $4, born = TO_DATE($5, 'DD/MM/YYYY') where id = ".concat(id, " RETURNING name, gender , phone , address , born ");
            db.query(update, data, function (error, results) {
              if (error) {
                callback(error, null);
              } else callback(null, results.rows[0]);
            });
          } else {
            var add = "INSERT INTO users (id, name, gender, phone, address, born ) VALUES (".concat(id, ", $1 , $2 , $3 , $4 , TO_DATE($5, 'DD/MM/YYYY')) RETURNING name, gender , phone , address , born");
            db.query(add, data, function (error, results) {
              if (error) callback(error, null);else callback(null, results.rows[0]);
            });
          }
        }
      });
    } catch (error) {
      callback(error, null);
    }
  },
  getInfo: function getInfo(id, callback) {
    var query = "select name, gender, phone, address, born from  users where id = ".concat(id);

    try {
      db.query(query, function (error, results) {
        if (error) callback(error, null);else callback(null, results.rows[0]);
      });
    } catch (error) {
      callback(error, null);
    }
  }
};
module.exports = user;