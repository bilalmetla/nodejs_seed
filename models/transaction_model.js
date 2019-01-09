var logger = require('../services/logger_service');
var dbService = require('../database');
var utils = require('../utils');
var blockchain = require('../services/blockchain_services');
var request = require("request");
let req = true

exports.createTransaction =async function(data, next){
     if(req){
            try{
            req = false
            let condition = {}
            var transaction = {}
            transaction.amountTransfor = data.amountTransfer
            condition.collection = "accounts";
            condition.where = {accountTitle: { $in: [data.walletAddress,data.recieverAddress] }}
            await dbService.read(data,condition, function (err, result) {
                if (!err) {
                   if(result[0].accountTitle==data.walletAddress){
                        transaction.sender = result[0].address  
                        transaction.reciever = result[1].address
                        transaction.privateKey = result[0].privateKey  
                    }else{
                        transaction.sender = result[1].address   
                        transaction.reciever = result[0].address  
                        transaction.privateKey = result[1].privateKey  
                    }
                    blockchain.transaction.createTransaction(transaction,function(err,res){
                        if(err){
                         return next(err,null);
                        }else{
                            var response = {}
                            var response = Object.assign(response,res)
                            let condition = {}
                            condition.collection = "transactions"
                            response.clientId = data.clientId  
                         dbService.create(response,condition, function (err, txsresult) {
                             return next(err, txsresult);
                             req = true
                         });
                        }
                    });
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
        let condition = {}
        condition.collection = "transactions";
        condition.where = { clientId: data.clientId };
        dbService.read(data,condition,function(err,res){
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

exports.getHistoricalDataHourly = function(data, next){
    try{    
        cmd = "https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&limit=12&apikey=37955e94b1804157cd5ce59b418fca9e67c607c2e62de8945bdebfe0c101726b"
        request(cmd, function (cmderror, cmdresponse, cmdbody) {
            if (cmderror) {
                return next(cmderror, null);
            } else {
                var response = JSON.parse(cmdbody)
                return next(null,response.Data)
            }
        })
    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}