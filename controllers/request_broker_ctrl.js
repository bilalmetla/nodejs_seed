var modelsCtrl = require('./models_ctrl');
var logger = require('../services/logger_service');
var constants = require('../constants/');


exports.send = function (data, next){
    try {

        if (data.serveFrom == constants.servingFromDB) {

            modelsCtrl.sendRequest(data.route, data, next);
        }
    }catch(e){
        logger.error("Exception:" )  ;
        logger.error(e.stack);
    }
}