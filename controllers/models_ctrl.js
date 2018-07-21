
var models = require('../models');
var logger = require('../services/logger_service');



function sendRequest(route,data, next) {
    try {
        switch (route) {

            case 'getAllUsers':
                models.users.getAllUsers(data, next);
                break;
        }
    } catch (e) {
        logger.error("Exception:" )  ;
        logger.error(e.stack);
    }
}

exports.sendRequest = sendRequest;