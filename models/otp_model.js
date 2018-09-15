var dbService = require('../database');
var utils = require('../utils');

exports.sendOtp = function(data, next){
    try{
        data.collection = "otp";
        
        dbService.create(data, function (err, result) {
            return next(err, result);
        });

    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}

exports.otpConf = function(data, next){
    try{
        data.collection = "otp";
        data.where = {contactNumber: data.payload.contactNumber};
        dbService.read(data, function (err, result) {
            return next(err, result);
        });

    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}