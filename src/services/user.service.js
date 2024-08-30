const db = require('../models/connect');

const user = {
    addInfo : (id,data, callback)=>{
        let query = `select * from users where id = ${id}`;
       try {
        db.query(query, (error, results)=>{
            if(error){
                callback(error, null);
            }else{
                
                if(results.rowCount > 0){
                    callback("user đã tồn tại", null);
                }else{
                    let add =`INSERT INTO users (id, name, gender, phone, address, born ) VALUES (${id}, $1 , $2 , $3 , $4 , TO_DATE($5, 'DD/MM/YYYY')) RETURNING name, gender , phone , address , born`;
                    db.query(add, data , (error, results)=>{
                        if(error)
                            callback(error, null);
                        else
                            callback(null, results.rows[0]);
                    })
                }

            }
        })
       } catch (error) {
        callback(error, null);
       }
    },
    updateInfo : (id,data, callback)=>{
        let query = `select * from users where id = ${id}`;
       try {
        db.query(query, (error, results)=>{
            if(error){
                callback(error, null);
            }else{
                
                if(results.rowCount > 0){
                    let update = `UPDATE users SET  name = $1, gender = $2, phone = $3, address = $4, born = TO_DATE($5, 'DD/MM/YYYY') where id = ${id} RETURNING name, gender , phone , address , born `;
                    db.query(update,data, (error, results)=>{
                        if(error){
                            callback(error, null);
                        }else
                            callback(null, results.rows[0])
                    })
                }else{
                    let add =`INSERT INTO users (id, name, gender, phone, address, born ) VALUES (${id}, $1 , $2 , $3 , $4 , TO_DATE($5, 'DD/MM/YYYY')) RETURNING name, gender , phone , address , born`;
                    db.query(add, data , (error, results)=>{
                        if(error)
                            callback(error, null);
                        else
                            callback(null, results.rows[0]);
                    })
                }

            }
        })
       } catch (error) {
        callback(error, null);
       }
    },
    getInfo : (id,callback)=>{
        let query = `select name, gender, phone, address, born from  users where id = ${id}`;
        try {
            db.query(query,(error, results)=>{
                if(error)
                    callback(error, null);
                else
                    callback(null, results.rows[0]);
            })
        } catch (error) {
            callback(error, null);
        }
    }
    
}
module.exports = user