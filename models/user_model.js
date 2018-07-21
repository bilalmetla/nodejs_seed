var logger = require('../services/logger_service');


// we will use our db layer in all our models
exports.getAllUsers = function(data, next){
    try{
        return next(null, [{userId : 1}]);
    }catch (e) {
        logger.error("Exception:" )  ;
        logger.error(e.stack);
    }

}