var logger = require('../services/logger_service');
var dbService = require('../database');
var utils = require('../utils');
var blockchain = require('../services/blockchain_services');



exports.createTransaction =async function(data, next){
    try{
        data.collection = "accounts";
        data.where = { accountTitle: data.payload.walletAddress};
        await dbService.read(data, function (err, result) {
            if (!err) {
                result[0].amountTransfor = data.payload.amountTransfer
                blockchain.createTransaction(result,function(err,res){
                    if(err){
                     return next(err,null);
                    }else{
                        var response = {}
                        var response = Object.assign(response,res)
                        response.collection = "transactions"
                     dbService.create(response, function (err, result) {
                         return next(err, result);
                     });
                    }
                });
                console.log(result)
            }else{
                console.log(err)
            }
        })
              
    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}

exports.getBalance =async function(data, next){
    try{
       blockchain.getBalance(data.payload.address,function(err,res){
           if(err){
            return next(err,null);
           }
            return next(null,res);
       });       
    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}



exports.getBlock =async function(data, next){
    try{
       blockchain.getBlock(data,function(err,res){
           if(err){
            return next(err,null);
           }
            return next(null,res);
       });       
    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}

exports.getCurrentGasPrice =async function(data, next){
    try{
       blockchain.getCurrentGasPrice(data,function(err,res){
           if(err){
            return next(err,null);
           }
            return next(null,res);
       });       
    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}

exports.getTransactions = function(data, next){
    try{
        blockchain.gettransaction(data,function(err,res){
            if(err){
             return next(err,null);
            }
             return next(null,res);
        });
    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}