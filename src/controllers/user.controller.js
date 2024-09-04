const user = require('../services/user.service');


exports.addInfo = (req, res) => {
    const {name,gender,phone,address,born } = req.body;
    const users = req.user;
    let values=[name,gender,phone,address,born]
    let id = users.user.id
    user.addInfo(id,values, (error, results)=>{
        if(error){
            res.status(500).json({
                message: "Lỗi Hệ Thống",
                error: error

            })
        }else{
            res.status(200).json({
                message: "Đã Thêm Thông tin thành công",
                data: results
            })
        }
    })

}
exports.updateInfo = (req, res) => {
    const {name,gender,phone,address,born } = req.body;
    const users = req.user;
    let values=[name,gender,phone,address,born]
    let id = users.user.id
    user.updateInfo(id,values, (error, results)=>{
        if(error){
            res.status(500).json({
                message: "Lỗi Hệ Thống",
                error: error

            })
        }else{
            res.status(200).json({
                message: "Đã update dữ liệu thành công",
                data: results
            })
        }
    })

}

exports.getInfo = (req, res) => {
    const users = req.user;
    let id = users.user.id
    user.getInfo(id, (error, results)=>{
        if(error){
            res.status(500).json({
                message: "Lỗi Hệ Thống",
                data: null,
                error: error

            })
        }else{
            if(results === 0){
                res.status(400).json({
                    message: "bạn chưa thêm Thông tin ",
                    data: null,
                    error: null

                })
            }else{
                res.status(200).json({
                    message: "Thông tin ",
                    data: results,
                    error: null

                })
            }

           
        }
    })

}