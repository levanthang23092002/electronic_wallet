const express = require('express');
const auth = express.Router();
const authcontroller = require('../controllers/auth.controller');
const passport = require('passport');

auth.post('/register', authcontroller.register);
auth.get('/login', authcontroller.login);
auth.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
auth.get(
  '/google/callback',
  (req, res, next) => {
    passport.authenticate('google', (err, profile, accessToken) => {
      req.user = profile;
      req.token = accessToken;
      res.status(200).json({
        profile: profile,
        accessToken, accessToken
      })
      next();
    })(req, res, next);
  }
);
module.exports = auth;