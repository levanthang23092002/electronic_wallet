"use strict";

var express = require('express');

var router = express.Router();

var auth = require("./auth.router");

var authRoutes = require('./swagger.router');

var userRoutes = require('./userSwagger.router');

var walletRoutes = require('./walletSwagger.router');

var upload = require('./uploadswgger.router');

router.use('/auth', auth);
router.use('/swgauth', authRoutes);
router.use('/swguser', userRoutes);
router.use('/swgwallet', walletRoutes);
router.use('/swgupload', upload);
module.exports = router;