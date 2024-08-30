
const db = require('../models/connect');
exports.saveFiles = async (iduser, files, callback) => {
    if (files && files.length == 2) {
        const file1 = files[0];
        const file2 = files[1];
        const values = [iduser, file1.filename, file2.filename, file1.path, file2.path, file1.mimetype];
        let checkCCCD = `select * from cccd_images where user_id = ${iduser}`;
        db.query(checkCCCD, (error, cccd) => {
            if (error) {
                callback(error, null);
            } else {
                if (cccd.rowCount == 0) {
                    let query = `INSERT INTO cccd_images (user_id, front_image_filename, back_image_filename, front_image_path, back_image_path, type)
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
                    db.query(query, values, (error, results) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            callback(null, results.rows[0]);
                        }
                    });
                } else {
                    callback(null, 2);
                }
            }
        })
    } else {

        callback(null, 1);
    }

};
exports.updateFiles = async (iduser, files, callback) => {
    if (files && files.length == 2) {
        const file1 = files[0];
        const file2 = files[1];
        const values = [iduser, file1.filename, file2.filename, file1.path, file2.path, file1.mimetype];
        let checkCCCD = `select * from cccd_images where user_id = ${iduser}`;
        db.query(checkCCCD, (error, cccd) => {
            if (error) {
                callback(error, null);
            } else {
                if (cccd.rowCount > 0) {
                    let query = `UPDATE cccd_images SET 
                                front_image_filename = $2, 
                                back_image_filename = $3, 
                                front_image_path = $4, 
                                back_image_path = $5, 
                                type = $6
                            WHERE 
                                user_id = $1 
                            RETURNING *;`;
                    db.query(query, values, (error, results) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            callback(null, results.rows[0]);
                        }
                    });
                } else {
                    callback(null, 2);
                }
            }
        })
    } else {

        callback(null, 1);
    }

};
exports.viewFiles = (user_id, callback) => {
    const query = `SELECT * FROM cccd_images WHERE user_id = ${user_id}`;
    db.query(query, (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            if (results.rowCount == 0) {
                callback(null, 1);
            } else {
                const imageData = results.rows[0];
                const data = {
                    user_id: imageData.user_id,
                    front_image_url: `http://localhost:4000/public/img/${imageData.front_image_filename}`,
                    back_image_url: `http://localhost:4000/public/img/${imageData.back_image_filename}`,
                    type: imageData.type,
                    created_at: imageData.created_at,
                }
                callback(null, data)
            }
        }
    })
}

