const express = require('express');
const router = express.Router();
const auth = require("./auth.router");
const authRoutes = require('./swagger.router');
const userRoutes = require('./userSwagger.router');
const walletRoutes = require('./walletSwagger.router');
const upload = require('./uploadswgger.router');



router.use('/auth', auth);
router.use('/swgauth', authRoutes);
router.use('/swguser', userRoutes);
router.use('/swgwallet', walletRoutes);
router.use('/swgupload', upload);

module.exports = router;