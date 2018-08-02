
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
            case 'login':
                models.users.login(data, next);
                break;
            case 'createAccount':
                models.users.createAccount(data, next);
                break;
            case 'updateAccount':
                models.users.updateAccount(data, next);
                break;
            case 'deleteAccount':
                models.users.deleteAccount(data, next);
                break;
            case 'getAllCoins':
                models.users.getAllCoins(data, next);
                break;
            case 'getAccounts':
                models.users.getAccounts(data, next);
                break;
        }
    } catch (e) {
        logger.error("Exception:" )  ;
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}

exports.sendRequest = sendRequest;