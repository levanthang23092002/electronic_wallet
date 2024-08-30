"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var auth = express.Router();

var authcontroller = require('../controllers/auth.controller');

var passport = require('passport');

auth.post('/register', authcontroller.register);
auth.get('/login', authcontroller.login);
auth.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}));
auth.get('/google/callback', function (req, res, next) {
  passport.authenticate('google', function (err, profile, accessToken) {
    req.user = profile;
    req.token = accessToken;
    res.status(200).json(_defineProperty({
      profile: profile,
      accessToken: accessToken
    }, "accessToken", accessToken));
    next();
  })(req, res, next);
});
module.exports = auth;