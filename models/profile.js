var logger = require('../services/logger_service');
var dbService = require('../database');
var utils = require('../utils');

exports.editprofile = function (data, next) {
    try {
        let condition = {}
        condition.collection = "profile";
        //  data.updatePayload = { $set: {accountTitle: data.payload.accountTitle} };
        condition.where = { clientId: data.clientid };
        condition.updatePayload = { $set: { username: data.username, email: data.email, contact: data.contact, address: data.address, designation: data.designation, country: data.country, city: data.city } };
        dbService.update(data,condition, function (err, result) {
            return next(err, result);
        });

    } catch (e) {
        logger.error("Exception:");
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}

exports.createProfile = function(data, next){
    try{
        let condition = {}
        condition.collection = "profile";
        var datetime = new Date();
        data.issueDate = datetime
        dbService.create(data,condition, function (err, result) {
            if (!err) {
                return next(err, result);
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

exports.getProfile = function(data, next){
    try{
        let condition = {}
        condition.collection = "profile";   
        condition.where = {clientId: data.clientId};  
        dbService.read(data,condition, function (err, result) {
            return next(err, result);
        });

    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}