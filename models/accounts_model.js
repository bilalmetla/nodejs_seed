var logger = require('../services/logger_service');
var dbService = require('../database');
var utils = require('../utils');

exports.createAccount = function(data, next){
    try{
        data.collection = "accounts";
        dbService.create(data, function (err, result) {
            return next(err, result);
        });

    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}

exports.updateAccount = function(data, next){
    try{
        data.collection = "accounts";
        data.updatePayload = { $set: {accountTitle: data.payload.accountTitle} };
        data.where = {_id : data.payload.accountId};
        dbService.update(data, function (err, result) {
            return next(err, result);
        });

    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}

exports.deleteAccount = function(data, next){
    try{
        data.collection = "accounts";
        dbService.delete(data, function (err, result) {
            return next(err, result);
        });

    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}

exports.getAccounts = function(data, next){
    try{
        data.collection = "accounts";
        dbService.read(data, function (err, result) {
            return next(err, result);
        });

    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}