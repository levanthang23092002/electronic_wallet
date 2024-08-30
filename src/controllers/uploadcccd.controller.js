
const upload = require('../services/uploadcccd.service');

exports.uploadImages = async (req, res) => {
    try {
        const user = req.user;
        let iduser = user.user.id;
        const files = req.files;

        upload.saveFiles(iduser, files, (error, results) => {
            if (error) {
                res.status(500).json({
                    message: 'Error uploading files',
                    data: null,
                    error: error
                });
            } else {
                switch (results) {
                    case 1:
                        res.status(403).json({
                            message: "Bạn Cần Tải 2 Hình ảnh CCCD mặt trước và sau",
                            data: [],
                            error: null
                        });
                        break;
                    case 2:
                        res.status(404).json({
                            message: "Đã Tồn Tại Hình Ảnh CCCD",
                            data: [],
                            error: null
                        });
                        break;
                    default:
                        res.status(200).json({
                            message: "Thành Công",
                            data: results,
                            error: null
                        })
                        break;
                }
            }
        });

    } catch (error) {
        res.status(501).json({
            message: 'Error uploading files',
            error: error
        });
    }
};

exports.updateImages = async (req, res) => {
    try {
        const user = req.user;
        let iduser = user.user.id;
        const files = req.files;

        upload.updateFiles(iduser, files, (error, results) => {
            if (error) {
                res.status(500).json({
                    message: 'Error uploading files',
                    data: null,
                    error: error
                });
            } else {
                switch (results) {
                    case 1:
                        res.status(403).json({
                            message: "Bạn Cần Tải 2 Hình ảnh CCCD mặt trước và sau",
                            data: [],
                            error: null
                        });
                        break;
                    case 2:
                        res.status(404).json({
                            message: "Hiện Tại chưa có CCCD",
                            data: [],
                            error: null
                        });
                        break;
                    default:
                        res.status(200).json({
                            message: "Thành Công",
                            data: results,
                            error: null
                        })
                        break;
                }
            }
        });

    } catch (error) {
        res.status(501).json({
            message: 'Error uploading files',
            error: error
        });
    }
};

exports.ViewCCCD = async (req, res) => {
    try {
        const user = req.user;
        let iduser = user.user.id;
        upload.viewFiles(iduser, (error, results) => {
            if (error) {
                res.status(500).json({
                    message: 'Error uploading files',
                    data: null,
                    error: error
                });
            } else {
                switch (results) {
                    case 1:
                        res.status(404).json({
                            message: "Không Tồn Tại Hình Ảnh CCCD",
                            data: [],
                            error: null
                        });
                        break;
                    default:
                        res.status(200).json({
                            message: "Thành Công",
                            data: results,
                            error: null
                        })
                        break;
                }
            }
        });

    } catch (error) {
        res.status(501).json({
            message: 'Error uploading files',
            error: error
        });
    }
};