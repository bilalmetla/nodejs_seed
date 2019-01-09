var modelsCtrl = require('./models_ctrl');
var logger = require('../services/logger_service');
var utils = require('../utils');
var constants = require('../constants/');


exports.send = function (data,condition, next){
    try {

        if (condition.serveFrom == constants.servingFromDB) {

            modelsCtrl.sendRequest(condition.route,data, next);
        }
    }catch(e){
        logger.error("Exception:" )  ;
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}