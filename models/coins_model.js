var logger = require('../services/logger_service');
var dbService = require('../database');
var utils = require('../utils');

exports.getAllCoins = function(data, next){
    try{
        data.collection = "coins";
        dbService.read(data, function (err, result) {
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
        data.collection = "coins";
        dbService.create(data, function (err, result) {
            return next(err, result);
        });

    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}