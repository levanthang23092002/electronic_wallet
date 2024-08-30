"use strict";

var db = require('../models/connect');

function convertStringToNumber(currencyString) {
  var cleanedString = currencyString.replace(/[$,]/g, '');
  var number = parseFloat(cleanedString);
  return number;
}

function formatMoney(money) {
  var money1 = convertStringToNumber(money);
  var formatmoney = new Intl.NumberFormat('ja').format(money1) + ' VND';
  return formatmoney;
}

function formatDate(dateString) {
  var date = new Date(dateString);
  var day = String(date.getUTCDate()).padStart(2, '0');
  var month = String(date.getUTCMonth() + 1).padStart(2, '0');
  var year = date.getUTCFullYear();
  return "".concat(day, "-").concat(month, "-").concat(year);
}

var wallet = {
  viewWallet: function viewWallet(id, callback) {
    var query = "select accountname, accountnumber, balance, created_at from wallet where id = ".concat(id);

    try {
      db.query(query, function (error, results) {
        if (error) {
          callback(error, null);
        } else {
          callback(null, results.rows[0]);
        }
      });
    } catch (error) {
      callback(error, null);
    }
  },
  recharge: function recharge(id, data, callback) {
    var getAccountnumber = "select accountnumber, balance  from wallet where id = ".concat(id);

    try {
      db.query(getAccountnumber, function (error, account) {
        if (error) {
          callback(error, null);
        } else {
          var accountnumber = account.rows[0].accountnumber;
          var balance = convertStringToNumber(account.rows[0].balance);
          var transaction = "INSERT INTO transactions (user_id, type, amount, to_wallet_id, description) VALUES (".concat(id, ", 'deposit', $1,").concat(accountnumber, ", $2 ) RETURNING *");
          db.query(transaction, data, function (error, transaction) {
            if (error) {
              callback("Nạp Tiền Không Thành Công", null);
            } else {
              var money = data[0] + balance;
              var query = "UPDATE wallet SET balance = ".concat(money, " where id = ").concat(id, " ");
              db.query(query, function (error, results) {
                if (error) {
                  callback("Nạp Tiền Không Thành Công", null);
                } else {
                  callback(null, transaction.rows[0]);
                }
              });
            }
          });
        }
      });
    } catch (error) {
      callback(error, null);
    }
  },
  transaction: function transaction(id, data, callback) {
    // kiểm tra số dư 
    var checkBalance = "select accountnumber, balance, accountname  from wallet where id = ".concat(id);
    db.query(checkBalance, function (error, checkBalance) {
      if (error) {
        callback(error, null);
      } else {
        var nameFrom = checkBalance.rows[0].accountname;
        var accountFrom = checkBalance.rows[0].accountnumber;
        var balanceFrom = convertStringToNumber(checkBalance.rows[0].balance);

        if (accountFrom == data[0]) {
          callback(null, 0);
        } else {
          if (data[1] > balanceFrom) {
            callback(null, 1);
          } else {
            var checkAccountTo = "select accountnumber, balance from wallet where accountnumber = '".concat(data[0], "'");
            db.query(checkAccountTo, function _callee(error, AccountTo) {
              var nameto, accountTo, balanceTo, moneyForm, moneyTo, updBalanceF, updBalanceT, transaction;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!error) {
                        _context.next = 4;
                        break;
                      }

                      callback(error, null);
                      _context.next = 22;
                      break;

                    case 4:
                      if (!(AccountTo.rowCount == 0)) {
                        _context.next = 8;
                        break;
                      }

                      callback(null, 2);
                      _context.next = 22;
                      break;

                    case 8:
                      nameto = AccountTo.rows[0].accountname;
                      accountTo = AccountTo.rows[0].accountnumber;
                      balanceTo = convertStringToNumber(AccountTo.rows[0].balance);
                      moneyForm = balanceFrom - data[1];
                      moneyTo = balanceTo + data[1];
                      updBalanceF = "UPDATE wallet SET balance = ".concat(moneyForm, " where accountnumber = '").concat(accountFrom, "' RETURNING * ");
                      updBalanceT = "UPDATE wallet SET balance = ".concat(moneyTo, " where accountnumber = '").concat(accountTo, "' RETURNING * ");
                      _context.next = 17;
                      return regeneratorRuntime.awrap(db.query(updBalanceF, function (error, results) {
                        if (error) {
                          callback(error, null);
                        } else {
                          from = results.rows;
                        }
                      }));

                    case 17:
                      _context.next = 19;
                      return regeneratorRuntime.awrap(db.query(updBalanceT, function (error, results) {
                        if (error) {
                          callback(error, null);
                        } else {
                          to = results.rows;
                        }
                      }));

                    case 19:
                      transaction = "INSERT INTO transactions (user_id , type , amount , from_wallet_id , to_wallet_id, description) VALUES ( ".concat(id, " , 'transfer', $2 , ").concat(accountFrom, " , $1 , $3 ) RETURNING *");
                      _context.next = 22;
                      return regeneratorRuntime.awrap(db.query(transaction, data, function (error, transaction) {
                        if (error) {
                          callback(error, null);
                        } else {
                          var results = {
                            "từ tài khoản": accountFrom,
                            "người gửi ": nameFrom,
                            "đến tài khoản": accountTo,
                            "người nhận": nameto,
                            "số tiền": data[1],
                            "nội dung": data[2]
                          };
                          callback(null, results);
                        }
                      }));

                    case 22:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
          }
        }
      }
    });
  },
  transactionHistory: function transactionHistory(id, callback) {
    var checkAccount = "select accountnumber from wallet where id = ".concat(id);
    db.query(checkAccount, function (error, acc) {
      if (error) {
        callback(error, null);
      } else {
        if (acc.rows[0] == null) {
          callback(null, 1);
        } else {
          var account = acc.rows[0].accountnumber;
          var query = "select * from transactions where from_wallet_id = '".concat(account, "' or to_wallet_id = '").concat(account, "' ORDER BY created_at DESC");
          db.query(query, function (error, results) {
            if (error) {
              callback(error, null);
            } else {
              if (results.rows == null) {
                callback(null, 2);
              } else {
                var result = [];
                var array = results.rows;
                array.forEach(function (element) {
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
          });
        }
      }
    });
  },
  HistoryDetail: function HistoryDetail(idtransaction, userId, callback) {
    var acc = "select accountnumber from wallet where id = ".concat(userId);
    db.query(acc, function (error, acc) {
      if (error) {
        callback(error.message, null);
      } else {
        var accnumber = acc.rows[0].accountnumber;
        var query = " SELECT * FROM transactions WHERE id = ".concat(idtransaction, " AND (from_wallet_id = '").concat(accnumber, "' OR to_wallet_id = '").concat(accnumber, "') ");
        db.query(query, function (error, results) {
          if (error) {
            callback(error.message, null);
          } else {
            var accFrom = results.rows[0].from_wallet_id;
            var accTo = results.rows[0].to_wallet_id;
            var accountFrom = "select * from wallet where accountnumber = '".concat(accFrom, "'");
            var accountTo = "select * from wallet where accountnumber = '".concat(accTo, "'");
            db.query(accountFrom, function (error, resultsFrom) {
              if (error) {
                callback(error.message, null);
              } else {
                db.query(accountTo, function (error, resultsTo) {
                  if (error) {
                    callback(error.message, null);
                  } else {
                    var history = {};

                    if (accnumber == accFrom) {
                      history = {
                        "Reference_number": idtransaction,
                        "Source_account": resultsFrom.rows[0].accountnumber + " " + resultsFrom.rows[0].accountname,
                        "Amount": "-" + formatMoney(results.rows[0].amount),
                        "Beneficiary_account": resultsTo.rows[0].accountnumber + " " + resultsTo.rows[0].accountname,
                        "Description": results.rows[0].description,
                        "Date": formatDate(results.rows[0].created_at)
                      };
                    } else {
                      history = {
                        "Reference_number": idtransaction,
                        "Source_account": resultsFrom.rows[0].accountnumber + " " + resultsFrom.rows[0].accountname,
                        "Amount": "+" + formatMoney(results.rows[0].amount),
                        "Beneficiary_account": resultsTo.rows[0].accountnumber + " " + resultsTo.rows[0].accountname,
                        "Description": results.rows[0].description,
                        "Date": formatDate(results.rows[0].created_at)
                      };
                    }

                    callback(null, history);
                  }
                });
              }
            });
          }
        });
      }
    });
  }
};
module.exports = wallet;