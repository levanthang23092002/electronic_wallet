    const express = require('express');
    const router = express.Router();
    const user = require('../controllers/user.controller');
    const verifyToken = require('../middlewares/verifyToken');
    const uploadCCCD = require('../middlewares/uploadCCCD');

/**
 * @openapi
 * /api/swguser/addinfo:
 *   post:
 *     tags:
 *       - Thông Tin Cá Nhân
 *     summary: thêm thông tin cá nhân
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               born:
 *                 type: string
 *                 pattern: '^([0-2][0-9]|(3)[0-1])/((0)[0-9]|(1)[0-2])/((19)[5-9][0-9]|(20)[0-2][0-9])$'
 *                 description: Date of birth in the format DD/MM/YYYY
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

router.post('/addinfo',verifyToken ,user.addInfo);



/**
 * @openapi
 * /api/swguser/updateinfo:
 *   put:
 *     tags:
 *       - Thông Tin Cá Nhân
 *     summary: sửa thông tin cá nhân
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum:
 *                   - Male
 *                   - Female
 *                   - Other
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               born:
 *                 type: string
 *                 pattern: '^([0-2][0-9]|(3)[0-1])/((0)[0-9]|(1)[0-2])/((19)[5-9][0-9]|(20)[0-2][0-9])$'
 *                 description: Date of birth in the format DD/MM/YYYY
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

router.put('/updateinfo',verifyToken ,user.updateInfo);

/**
 * @openapi
 * /api/swguser/info:
 *   get:
 *     tags:
 *       - Thông Tin Cá Nhân
 *     summary: xem Thông Tin Cá Nhân
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

router.get('/info',verifyToken ,user.getInfo);

module.exports = router;
