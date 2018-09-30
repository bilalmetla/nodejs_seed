var logger = require('../services/logger_service');
var dbService = require('../database');
var utils = require('../utils');

exports.createTransaction = function(data, next){
    try{
        data.collection = "transactions";
        dbService.create(data, function (err, result) {
            return next(err, result);
        });

    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}

exports.getTransactions = function(data, next){
    try{
        data.collection = "transactions";
        dbService.read(data, function (err, result) {
            return next(err, result);
        });

    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}