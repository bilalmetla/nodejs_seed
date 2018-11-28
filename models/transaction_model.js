var logger = require('../services/logger_service');
var dbService = require('../database');
var utils = require('../utils');
var blockchain = require('../services/blockchain_services');

exports.createTransaction =async function(data, next){
    try{
       // data.collection = "transactions";
       // dbService.create(data, function (err, result) {
       //     return next(err, result);
       // });
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