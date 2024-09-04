
const db = require('../models/connect');

function convertStringToNumber(currencyString) {
    const cleanedString = currencyString.replace(/[$,]/g, '');
    const number = parseFloat(cleanedString);
    return number;
}
function formatMoney(money) {
    let money1 = convertStringToNumber(money)
    const formatmoney = new Intl.NumberFormat('ja').format(money1) + ' VND';
    return formatmoney;

}
function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
}
const wallet = {
    viewWallet: (id, callback) => {
        let query = `select accountname, accountnumber, balance, created_at from wallet where id = ${id}`;
        try {
            db.query(query, (error, results) => {
                if (error) {
                    callback(error, null);
                } else {
                    if(results.rowCount == 0)
                        callback(null, 0);
                    else
                        callback(null, results.rows[0]);
                }
            });
        } catch (error) {
            callback(error, null);
        }
    },
    recharge: (id, data, callback) => {
        let getAccountnumber = `select accountnumber, balance  from wallet where id = ${id}`
        try {
            db.query(getAccountnumber, (error, account) => {
                if (error) {
                    callback(error, null);
                } else {
                    if(account.rowCount == 0){
                        callback(null,null)
                    }
                    const accountnumber = account.rows[0].accountnumber;
                    const balance = convertStringToNumber(account.rows[0].balance);
                    let transaction = `INSERT INTO transactions (user_id, type, amount, to_wallet_id, description) VALUES (${id}, 'deposit', $1,${accountnumber}, $2 ) RETURNING *`;
                    db.query(transaction, data, (error, transaction) => {
                        if (error) {
                            callback("Nạp Tiền Không Thành Công", null);
                        } else {
                            let money = data[0] + balance;
                            let query = `UPDATE wallet SET balance = ${money} where id = ${id} `;
                            db.query(query, (error, results) => {
                                if (error) {
                                    callback("Nạp Tiền Không Thành Công", null);
                                } else {
                                    callback(null, transaction.rows[0]);
                                }
                            });
                        }
                    })

                }
            })
        } catch (error) {
            callback(error, null);
        }
    },
    transaction: (id, data, callback) => {
        // kiểm tra số dư 
        let checkBalance = `select accountnumber, balance, accountname  from wallet where id = ${id}`;
        db.query(checkBalance, (error, checkBalance) => {
            if (error) {
                callback(error, null);
            } else {
                const nameFrom = checkBalance.rows[0].accountname;
                const accountFrom = checkBalance.rows[0].accountnumber;
                const balanceFrom = convertStringToNumber(checkBalance.rows[0].balance);
                if (accountFrom == data[0]) {
                    callback(null, 0);
                } else {
                    if (data[1] > balanceFrom) {
                        callback(null, 1);
                    } else {
                        let checkAccountTo = `select accountnumber, balance from wallet where accountnumber = '${data[0]}'`;
                        db.query(checkAccountTo, async (error, AccountTo) => {
                            if (error) {
                                callback(error, null);
                            } else {
                                if (AccountTo.rowCount == 0) {
                                    callback(null, 2);
                                } else {
                                    const nameto = AccountTo.rows[0].accountname;
                                    const accountTo = AccountTo.rows[0].accountnumber;
                                    const balanceTo = convertStringToNumber(AccountTo.rows[0].balance);
                                    let moneyForm = balanceFrom - data[1];
                                    let moneyTo = balanceTo + data[1]
                                    let updBalanceF = `UPDATE wallet SET balance = ${moneyForm} where accountnumber = '${accountFrom}' RETURNING * `;
                                    let updBalanceT = `UPDATE wallet SET balance = ${moneyTo} where accountnumber = '${accountTo}' RETURNING * `;


                                    await db.query(updBalanceF, (error, results) => {
                                        if (error) {
                                            callback(error, null);
                                        } else {
                                            from = results.rows;
                                        }
                                    })
                                    await db.query(updBalanceT, (error, results) => {
                                        if (error) {

                                            callback(error, null);
                                        } else {
                                            to = results.rows;
                                        }
                                    })

                                    let transaction = `INSERT INTO transactions (user_id , type , amount , from_wallet_id , to_wallet_id, description) VALUES ( ${id} , 'transfer', $2 , ${accountFrom} , $1 , $3 ) RETURNING *`;
                                    await db.query(transaction, data, (error, transaction) => {
                                        if (error) {
                                            callback(error, null);
                                        } else {
                                            let results = {
                                                "từ tài khoản": accountFrom,
                                                "người gửi ": nameFrom,
                                                "đến tài khoản": accountTo,
                                                "người nhận": nameto,
                                                "số tiền": data[1],
                                                "nội dung": data[2],
                                            }
                                            callback(null, results);
                                        }
                                    })
                                }
                            }
                        })

                    }
                }

            }
        });
    },
    transactionHistory: (id, callback) => {
        let checkAccount = `select accountnumber from wallet where id = ${id}`;
        db.query(checkAccount, (error, acc) => {
            if (error) {
                callback(error, null);
            } else {
                if (acc.rows[0] == null) {
                    callback(null, 1);
                } else {
                    const account = acc.rows[0].accountnumber;
                    let query = `select * from transactions where from_wallet_id = '${account}' or to_wallet_id = '${account}' ORDER BY created_at DESC`;
                    db.query(query, (error, results) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            if (results.rows == null) {
                                callback(null, 2);
                            } else {
                                let result = [];
                                let array = results.rows;
                                array.forEach(element => {
                                    if (element.from_wallet_id == account) {
                                        result.push({
                                            date: formatDate(element.created_at),
                                            type: element.type,
                                            mount: "-" + formatMoney(element.amount),
                                            description: element.description
                                        });
                                    } else {
                                        result.push({
                                            date: formatDate(element.created_at),
                                            type: element.type,
                                            mount: "+" + formatMoney(element.amount),
                                            description: element.description
                                        });
                                    }
                                });
                                callback(null, result);
                            }

                        }
                    })
                }
            }
        })

    },
    HistoryDetail: (idtransaction, userId, callback) => {
        let acc = `select accountnumber from wallet where id = ${userId}`
        db.query(acc, (error, acc) => {
            if (error) {
                callback(error.message, null);
            } else {
                const accnumber = acc.rows[0].accountnumber;
                let query = ` SELECT * FROM transactions WHERE id = ${idtransaction} AND (from_wallet_id = '${accnumber}' OR to_wallet_id = '${accnumber}') `;
                db.query(query, (error, results) => {
                    if (error) {
                        callback(error.message, null);
                    } else {
                        if(results.rowCount == 0){
                            callback(null,null)
                        }
                        const accFrom = results.rows[0].from_wallet_id;
                        const accTo = results.rows[0].to_wallet_id;
                        let accountFrom = `select * from wallet where accountnumber = '${accFrom}'`;
                        let accountTo = `select * from wallet where accountnumber = '${accTo}'`;
                        db.query(accountFrom, (error, resultsFrom) => {
                            if (error) {
                                callback(error.message, null);
                            } else {
                                db.query(accountTo, (error, resultsTo) => {
                                    if (error) {
                                        callback(error.message, null);
                                    } else {
                                        let history = {};
                                        if (accnumber == accFrom) {
                                            history = {
                                                "Reference_number": idtransaction,
                                                "Source_account": resultsFrom.rows[0].accountnumber + " " + resultsFrom.rows[0].accountname,
                                                "Amount": "-" + formatMoney(results.rows[0].amount),
                                                "Beneficiary_account": resultsTo.rows[0].accountnumber + " " + resultsTo.rows[0].accountname,
                                                "Description": results.rows[0].description,
                                                "Date": formatDate(results.rows[0].created_at),
                                            }

                                        } else {
                                            history = {
                                                "Reference_number": idtransaction,
                                                "Source_account": resultsFrom.rows[0].accountnumber + " " + resultsFrom.rows[0].accountname,
                                                "Amount": "+" + formatMoney(results.rows[0].amount),
                                                "Beneficiary_account": resultsTo.rows[0].accountnumber + " " + resultsTo.rows[0].accountname,
                                                "Description": results.rows[0].description,
                                                "Date": formatDate(results.rows[0].created_at),
                                            }

                                        }
                                        callback(null, history);



                                    }
                                })
                            }
                        })
                    }
                });
            }
        });

    },
}
module.exports = wallet;