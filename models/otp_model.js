var dbService = require('../database');
var utils = require('../utils');

exports.sendOtp = function(data, next){
    try{
        let condition = {}
       condition.collection = "otp";
        dbService.create(data,condition, function (err, result) {
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
        let condition = {}
       condition.collection = "otp";        
       condition.where = {otp: data.otpCode};
        dbService.read(data,condition, function (err, result) {
            if(err){
                return next(err, result);
            }else{
                if(result.length>0){
                    let condition = {}
                    condition.collection = "otp";                     
                    condition.where = {otp: data.otp};
                    condition.updatePayload = { $set: { isUsed: true} };
                    dbService.update(data,condition, function (err, insertresult) {
                        return next(err,result)
                    })           
                }else{
                    return next(err, result)
                }
            }
        });

    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}