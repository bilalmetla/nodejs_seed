
var request = require("request");
var asyncLoop = require('node-async-loop');
var cron = require('node-cron');
var logger = require('../services/logger_service');
var dbService = require('../database');
var utils = require('../utils');
var blockchain = require('../services/blockchain_services');

const self = this 
var flag = false;
cron.schedule('1 * * * * *', () => {
    self.getBalancebyDb()
  });
exports.getBalancebyDb = async function () {
    try {
        if(flag){
            flag=false
            let condition = {}
            var data = {}
            condition.collection = "accounts";
            dbService.read(data,condition, function (err, result) {
                if (!err) {
                    self.getBalancebyBlockchain(result)
                } else {
                    console.log("error reading from db "+err)
                }
            })
        }

    } catch (e) {
        logger.error("Exception:");
        logger.error(e.stack);
    }
}; //end of balanceOf

exports.getBalancebyBlockchain = async function (result) {
    try {
        asyncLoop(result, function (item, next) {
            blockchain.transaction.getBalance(item.address, function (err, balance) {
                if (err) {
                    next()
                } else {
                    item.balance = balance
                    next()
                }
            })
        }, function (parseerr) {
            if (parseerr) {
                console.error('Error: ' + err.message);
            } else {
                self.insertupdateAddress(result)
            }
        })
    } catch (e) {
        logger.error("Exception:");
        logger.error(e.stack);
    }
}; //end of balanceOf

exports.insertupdateAddress = async function (result) {
    try {
        var data = {}
        let condition = {}
        condition.collection = "accounts";
        asyncLoop(result, function (item, insertNext) {
            condition.where = { accountTitle: item.accountTitle };
            condition.updatePayload = { $set: { balance: item.balance } };
            dbService.update(data,condition, function (err, updateres) {
                insertNext()
            });
        }, function (parseerr) {
            if (parseerr) {
                console.error('Error: ' + err.message);
            } else {
                flag = true
                console.log('Updated Address');
            }

        });
    } catch (e) {
        logger.error("Exception:");
        logger.error(e.stack);
    }


}