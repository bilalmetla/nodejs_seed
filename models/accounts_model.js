var asyncLoop = require('node-async-loop');
var logger = require('../services/logger_service');
var dbService = require('../database');
var utils = require('../utils');
var blockchain = require('../services/blockchain_services');


exports.createAccount = async function (data, next) {
    try {
        var account = {}
        blockchain.createAccount(data, function (err, res) {
            if (err) {
                return next(err, null);
            } else {
                blockchain.getBalance(res.address, function (err, balance) {
                    if (err) {
                        return next(err, null);
                    } else {
                        account.collection = "accounts";
                        account.address = res.address
                        account.privateKey = res.privateKey
                        account.accountTitle = data.payload.accountTitle
                        account.balance = balance
                        dbService.create(account, function (err, result) {
                            return next(err, result);
                        });
                    }
                })
            }
        });
    } catch (e) {
        logger.error("Exception:");
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}


exports.updateAccount = function (data, next) {
    try {
        data.collection = "accounts";
        //  data.updatePayload = { $set: {accountTitle: data.payload.accountTitle} };
        data.where = { accountTitle: data.payload.accountTitle };
        data.updatePayload = { $set: { accountTitle: data.payload.newaccountTitle } };
        dbService.update(data, function (err, result) {
            return next(err, result);
        });

    } catch (e) {
        logger.error("Exception:");
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}

exports.deleteAccount = function (data, next) {
    try {
        data.collection = "accounts";

        data.where = { accountTitle: data.payload.accountTitle };

        dbService.delete(data, function (err, result) {
            return next(err, result);
        });

    } catch (e) {
        logger.error("Exception:");
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}

exports.getAccounts = function (data, next) {
    try {
        data.collection = "accounts";
        dbService.read(data, function (err, result) {
            if (!err) {
                var request = require("request");
                cmd = "http://free.currencyconverterapi.com/api/v5/convert?q=USD_PKR&compact=y"
                request(cmd, function (cmderror, cmdresponse, cmdbody) {
                    if (cmderror) {
                        return next(cmderror, null);
                    } else {
                        var response = JSON.parse(cmdbody)
                        asyncLoop(result, function (item, next) {
                            item.dollar = "$"+(parseFloat(item.balance)*parseFloat(response.USD_PKR.val))
                            next()
                        }, function (parseerr) {
                                if (parseerr) {
                                    console.error('Error: ' + err.message);
                                    return next(parseerr, null);
                                }else{
                                    return next(parseerr, result);
                                }
                            console.log('Finished!');
                            });
                    }
                });
            } else {
                return next(err, result);
            }
        });

    } catch (e) {
        logger.error("Exception:");
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}