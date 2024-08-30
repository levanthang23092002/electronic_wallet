const auth = require('../services/auth.service');

exports.register = (req, res) => {
    const {email, password} = req.body;
    let values =[email, password]
    auth.register(values,(err, result) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'Lỗi Hệ Thống',
                data: {},
                error_code: err
              });
        }else if(result === 0){
            res.status(401).json({
                success: true,
                message: 'Đăng kí thất bại ',
                data: {},
                error_code: null
              });
        }else{
            res.status(200).json({
                success: true,
                message: 'Đăng kí Thành Công',
                data: result,
                error_code: null
              });
        }
        
    })
}

exports.login = (req,res)=>{
    const {email, password} = req.body;
    let values =[email, password]
    auth.login(values,(err, result) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'Lỗi Hệ Thống',
                data: {},
                error_code: err
              });
        }else if(result === 0){
            res.status(401).json({
                success: true,
                message: 'Đăng nhập thất bại ',
                data: {},
                error_code: null
              });
        }else{
            res.status(200).json({
                success: true,
                message: 'Đăng nhập Thành Công',
                data: result,
                error_code: null
              });
        }
        
    })
}

