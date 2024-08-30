"use strict";

var express = require('express');

var cors = require('cors');

var session = require('express-session');

var pool = require('./src/models/connect');

var router = require('./src/routers/index.router');

var swaggerDocs = require('./src/config/swagger');

require('./src/config/passportGoogle');

var passport = require('passport');

var app = express();
passport.serializeUser(function (user, done) {
  // Tuần tự hóa thông tin người dùng thành một chuỗi
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  // Giải tuần tự hóa chuỗi thành thông tin người dùng
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false
}));
pool.connect();
app.use(cors());
app.use(express.json());
app.use('/api', router);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
  swaggerDocs(app, PORT);
});