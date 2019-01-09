var logger = require('../services/logger_service');
var dbService = require('../database');
var utils = require('../utils');

exports.getAllCoins = function(data, next){
    try{
        var account = {}
        account.collection = "coins";
        dbService.read(data,account, function (err, result) {
            return next(err, result);
        });

    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}

exports.createCoins = function(data, next){
    try{
        var account = {}
        account.collection = "coins";
        dbService.create(data,account, function (err, result) {
            return next(err, result);
        });

    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}