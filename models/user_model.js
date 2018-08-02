var logger = require('../services/logger_service');
var dbService = require('../database');
var utils = require('../utils');

// we will use our db layer in all our models
exports.getAllUsers = function(data, next){
    try{
        data.collection = "users";
        dbService.read(data, function (err, result) {
            return next(err, result);
        });

    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}

exports.signup = function(data, next){
    try{
        data.collection = "users";
        dbService.create(data, function (err, result) {
            return next(err, result);
        });

    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}

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

exports.login = function(data, next){
    try{
        data.collection = "users";
        data.where = {username: data.payload.username};
        dbService.read(data, function (err, result) {
            return next(err, result);
        });

    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}

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