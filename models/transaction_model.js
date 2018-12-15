var logger = require('../services/logger_service');
var dbService = require('../database');
var utils = require('../utils');
var blockchain = require('../services/blockchain_services');



exports.createTransaction =async function(data, next){
    try{
       blockchain.createTransaction(data,function(err,res){
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

exports.getBalance =async function(data, next){
    try{
       blockchain.getBalance(data,function(err,res){
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