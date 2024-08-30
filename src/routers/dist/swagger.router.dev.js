"use strict";

var express = require('express');

var router = express.Router();

var auth = require('../controllers/auth.controller');

var passport = require('passport');
/**
 * @openapi
 * /api/swgauth/login:
 *   post:
 *     tags:
 *       - Đăng kí / Đăng Nhập
 *     summary: Đăng Nhập
 *     description: đăng nhập bằng gmail và password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *       400:
 *         description: Unauthorized
 */


router.post('/login', auth.login);
/**
 * @openapi
 * /api/swgauth/register:
 *   post:
 *     tags:
 *       - Đăng kí / Đăng Nhập
 *     summary: Đăng Kí
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *       400:
 *         description: Unauthorized
 */

router.post('/register', auth.register);
/**
 * @openapi
 * /api/swgauth/google:
 *   get:
 *     tags:
 *       - Đăng kí / Đăng Nhập
 *     summary: Đăng nhập Google
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *       400:
 *         description: Unauthorized
 */

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}));
module.exports = router;