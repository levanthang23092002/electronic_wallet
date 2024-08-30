"use strict";

var express = require('express');

var router = express.Router();

var wallet = require('../controllers/wallet.controller');

var verifyToken = require('../middlewares/verifyToken');
/**
 * @openapi
 * /api/swgwallet/view:
 *   get:
 *     tags:
 *       - Ví
 *     summary: xem Tài Khoản Ví
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


router.get('/view', verifyToken, wallet.viewWallet);
/**
 * @openapi
 * /api/swgwallet/recharge:
 *   post:
 *     tags:
 *       - Ví
 *     summary: Nộp Tiền Vào Tài Khoản
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               description:
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

router.post('/recharge', verifyToken, wallet.recharges);
/**
 * @openapi
 * /api/swgwallet/trasaction:
 *   post:
 *     tags:
 *       - Ví
 *     summary: Chuyển Khoản
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               soTaiKhoan:
 *                 type: string
 *                 pattern: '^([0-9]{12})$'    
 *               transfer:
 *                 type: number
 *               description:
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

router.post('/trasaction', verifyToken, wallet.trasaction);
/**
 * @openapi
 * /api/swgwallet/transaction-history:
 *   get:
 *     tags:
 *       - Ví
 *     summary: xem Lịch Sử Giao Dịch
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

router.get('/transaction-history', verifyToken, wallet.trasactionHistory);
/**
 * @openapi
 * /api/swgwallet/transaction-history-detail/{idtransaction}:
 *   get:
 *     tags:
 *       - Ví
 *     summary: Xem chi tiết Lịch Sử Giao Dịch theo mã giao dịch
 *     parameters:
 *       - in: path
 *         name: idtransaction
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã giao dịch cần xem chi tiết
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
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 */

router.get('/transaction-history-detail/:idtransaction', verifyToken, wallet.historyDetail);
module.exports = router;