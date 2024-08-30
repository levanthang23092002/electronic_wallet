const wallet = require('../services/wallet.service');

exports.viewWallet = (req, res) => {
    const user = req.user;
    let id = user.user.id;
    wallet.viewWallet(id, (error, results) => {
        if (error) {
            res.status(500).json({
                message: "Lỗi Hệ Thống",
                data: null,
                error: error,
            })
        } else {
            if (results.length == 0) {
                res.status(400).json({
                    message: "Chưa Tạo ví thêm Thông tin cá nhân để tạo ví",
                    data: [],
                    error: null
                })
            } else {
                res.status(400).json({
                    message: "Thành công",
                    data: results,
                    error: null
                })
            }

        }
    })
}

exports.recharges = (req, res) => {
    const user = req.user;
    let id = user.user.id;
    const { amount, description } = req.body;
    const values = [amount, description]
    wallet.recharge(id, values, (error, results) => {
        if (error) {
            res.status(500).json({
                message: "Lỗi Hệ Thống",
                data: null,
                error: error,
            })
        } else {
            if (results == null) {
                res.status(400).json({
                    message: "Chưa Tạo ví thêm Thông tin cá nhân để tạo ví",
                    data: [],
                    error: null
                })
            } else {
                res.status(200).json({
                    message: "Thành công",
                    data: results,
                    error: null
                })
            }

        }
    })
}


exports.trasaction = (req, res) => {
    const user = req.user;
    let id = user.user.id;
    const { soTaiKhoan, transfer, description } = req.body;
    const values = [soTaiKhoan, transfer, description]
    wallet.transaction(id, values, (error, results) => {
        if (error) {
            res.status(500).json({
                message: "Lỗi Hệ Thống",
                data: null,
                error: error,
            })
        } else {
            switch (results) {
                case 0:
                    res.status(401).json({
                        message: "Không Thể chuyển cho chính mình",
                        data: [],
                        error: null
                    });
                    break;
                case 1:
                    res.status(403).json({
                        message: "Số Dư Không Đủ",
                        data: [],
                        error: null
                    });
                    break;
                case 2:
                    res.status(404).json({
                        message: "Tài Khoản gửi đi Không tộn Tại",
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
    })
}

exports.trasactionHistory = (req, res) => {
    const user = req.user;
    let id = user.user.id;
    wallet.transactionHistory(id, (error, results) => {
        if (error) {
            res.status(500).json({
                message: "Lỗi Hệ Thống",
                data: null,
                error: error,
            })
        } else {
            switch (results) {
                case 1:
                    res.status(400).json({
                        message: "Chưa có Tài Khoản",
                        data: [],
                        error: null
                    });
                    break;
                case 2:
                    res.status(400).json({
                        message: "Chưa có giao dịch nào",
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
    })
}


exports.historyDetail = (req, res) => {
    const user = req.user;
    let userId = user.user.id;
    const { idtransaction } = req.params;
    wallet.HistoryDetail(parseInt(idtransaction), parseInt(userId), (error, results) => {
        if (error) {
            res.status(500).json({
                message: "Lỗi Hệ Thống",
                data: null,
                error: error,
            })
        } else {
            if (results == null) {
                res.status(400).json({
                    message: "Không có mã giao dịch này",
                    data: [],
                    error: null
                });
            } else {
                res.status(200).json({
                    message: "Thành Công",
                    data: results,
                    error: null
                })
            }
        }
    })
}