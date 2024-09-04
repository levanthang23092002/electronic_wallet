
const db = require('../models/connect');
const jwt = require('jsonwebtoken')

const auth = {
    register: (data, callback) => {
        try {
            let query = `INSERT INTO accounts (email, password) VALUES ($1, $2) RETURNING id, email,password,created_at`;
            db.query(query, data, (error, results) => {
                if (error) {
                    console.log(error);
                    callback(error, null);
                } else {
                    callback(null, results.rows);
                }
            });
        } catch (error) {
            callback(error, null);
        }
    },
    login: (data, callback) => {
        try {
            let query = 'SELECT * FROM accounts WHERE email = $1 and password = $2';
            db.query(query, data, (error, results) => {
                if (error) {
                  callback(error, null);
                }
                if (data === null || (Array.isArray(data) && data[0] === null || data[1] === null)) {
                  callback(null, 1);
                } else {
                  if (results.rows.length === 0) {
                    callback(null, 0);
                  } else {
                    const user = results.rows[0];
          
                    // Tạo mã JWT
                    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
          
                    // Gửi mã JWT và thông tin người dùng
                    callback(null, { token, user });
                  }
                }
              });
        } catch (error) {
            console.log(error);
            callback(error, null);
        }
    }
}
module.exports = auth;