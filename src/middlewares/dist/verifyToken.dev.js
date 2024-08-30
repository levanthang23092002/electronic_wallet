"use strict";

var jwt = require('jsonwebtoken');

var verifyToken = function verifyToken(req, res, next) {
  var authtoken = req.headers['authorization'];
  var token;

  if (!authtoken) {
    return res.status(401).json({
      message: 'Missing token'
    });
  } else {
    token = authtoken.split(' ')[1];
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }
};

module.exports = verifyToken;