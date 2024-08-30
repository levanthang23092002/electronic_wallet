"use strict";

var express = require('express');

var router = express.Router();

var upload = require('../controllers/uploadcccd.controller');

var verifyToken = require('../middlewares/verifyToken');

var uploadCCCD = require('../middlewares/uploadCCCD');
/**
 * @openapi
 * /api/swgupload/upload-cccd:
 *   post:
 *     tags:
 *       - CCCD 
 *     summary: Upload Căn Cước Công Dân
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Chọn 2 file ảnh để upload
 *             required:
 *               - images
 *     responses:
 *       200:
 *         description: Upload thành công
 *       400:
 *         description: Lỗi upload file
 */


router.post('/upload-cccd', verifyToken, uploadCCCD, upload.uploadImages);
/**
 * @openapi
 * /api/swgupload/update-cccd:
 *   put:
 *     tags:
 *       - CCCD 
 *     summary: Update Căn Cước Công Dân
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Chọn 2 file ảnh để upload
 *             required:
 *               - images
 *     responses:
 *       200:
 *         description: Upload thành công
 *       400:
 *         description: Lỗi upload file
 */

router.put('/update-cccd', verifyToken, uploadCCCD, upload.updateImages);
/**
 * @openapi
 * /api/swgupload/view-cccd:
 *   get:
 *     tags:
 *       - CCCD
 *     summary: Xem hình ảnh CCCD của người dùng
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                 front_image_url:
 *                   type: string
 *                   format: url
 *                   description: Đường dẫn hình ảnh mặt trước CCCD
 *                 back_image_url:
 *                   type: string
 *                   format: url
 *                   description: Đường dẫn hình ảnh mặt sau CCCD
 *                 type:
 *                   type: string
 *                   description: Loại file (mimetype)
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Thời gian tạo
 *       404:
 *         description: Không tìm thấy hình ảnh cho người dùng này
 *       500:
 *         description: Lỗi truy vấn dữ liệu
 */

router.get('/view-cccd', verifyToken, upload.ViewCCCD);
module.exports = router;