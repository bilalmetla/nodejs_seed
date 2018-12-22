
var request = require("request");
var asyncLoop = require('node-async-loop');
var cron = require('node-cron');
var logger = require('../services/logger_service');
var dbService = require('../database');
var utils = require('../utils');
var blockchain = require('../services/blockchain_services');

var self = this 
var flag = false;
cron.schedule('1 * * * * *', () => {
    self.getBalancebyDb()
  });
exports.getBalancebyDb = async function () {
    try {
        if(flag){
            flag=false
            var data = {}
            data.collection = "accounts";
            dbService.read(data, function (err, result) {
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
            blockchain.getBalance(item.address, function (err, balance) {
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
        data.collection = "accounts";
        asyncLoop(result, function (item, insertNext) {
            data.where = { accountTitle: item.accountTitle };
            data.updatePayload = { $set: { balance: item.balance } };
            dbService.update(data, function (err, updateres) {
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