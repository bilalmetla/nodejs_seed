
var models = require('../models');
var logger = require('../services/logger_service');
var utils = require('../utils');



function sendRequest(route,data, next) {
    try {
        switch (route) {

            case 'getAllUsers':
                models.users.getAllUsers(data, next);
                break;
            case 'signup':
                models.users.signup(data, next);
                break;
            case 'otpConf':
                models.otp.otpConf(data, next);
                break;
            case 'login':
                models.users.login(data, next);
                break;
            case 'createAccount':
                models.accounts.createAccount(data, next);
                break;
            case 'updateAccount':
                models.accounts.updateAccount(data, next);
                break;
            case 'deleteAccount':
                models.accounts.deleteAccount(data, next);
                break;
            case 'getAllCoins':
                models.coins.getAllCoins(data, next);
                break;
            case 'getAccounts':
                models.accounts.getAccounts(data, next);
                break;
            case 'createCoins':
                models.coins.createCoins(data, next);
                break;
            case 'sendOtp':
                models.otp.sendOtp(data, next);
                break;
            case 'createTransaction':
                models.transaction.createTransaction(data, next);
                break;
            case 'getTransactions':
                models.transaction.getTransactions(data, next);
                break;
            case 'getBalance':
                models.transaction.getBalance(data, next);
                break;
            case 'getBlock':
                models.transaction.getBlock(data, next);
                break;
            case 'getCurrentGasPrice':
                models.transaction.getCurrentGasPrice(data, next);
                break;
            case 'feedback':
                models.users.feedback(data, next);
                break;
            case 'editprofile':
                models.profile.editprofile(data, next);
                break;
            case 'createProfile':
                models.profile.createProfile(data, next);
                break;
            case 'getProfile':
                models.profile.getProfile(data, next);
                break;
            case 'getHistory':
                models.transaction.getHistoricalDataHourly(data, next);
                break;
            case 'getSahulatUser':
                models.sahulat.getSahulatUser(data, next);
                break;
            case 'sahulatSignup':
                models.sahulat.sahulatSignup(data, next);
                break;
            case 'sahulatPlacingJobs':
                models.sahulat.sahulatPlacingJobs(data, next);
                break;
            case 'sahulatApplying':
                models.sahulat.sahulatApplying(data, next);
                break;
            case 'sahulatBids':
                models.sahulat.sahulatBids(data, next);
                break;
            case 'sahulatgetJobs':
                models.sahulat.sahulatgetJobs(data, next);
                break;
        }
    } catch (e) {
        logger.error("Exception:" )  ;
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}

exports.sendRequest = sendRequest;