var logger = require('../services/logger_service');
var dbService = require('../database');
var utils = require('../utils');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// we will use our db layer in all our models
exports.getAllUsers = function(data, next){
    try{
        let condition = {}
        condition.collection = "users";     
        dbService.read(data,condition, function (err, result) {
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
        let condition = {}
        condition.collection = "users";
        var randtoken = require('rand-token');
        var token = randtoken.generate(20, data.username+"abcdefghijklnmopqrstuvwxyz"+data.email);
        data.clientId = token
        var datetime = new Date();
        data.issueDate = datetime
        dbService.create(data,condition, function (err, result) {
            if (!err) {
                return next(err, token);
            }else{
                return next(err, result);
            }
        });
        
    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}



exports.login = function(data, next){
    try{
        let condition = {}
        condition.collection = "users";        
        condition.where = {username: data.username};
            dbService.read(data,condition, function (err, result) {
            return next(err, result);
        });
    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}

exports.feedback = function(data, next){
    try{
        let condition = {}
        condition.collection = "feedback";        
        dbService.create(data,condition, function (err, result) {
            return next(err, result);
        });
    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}



