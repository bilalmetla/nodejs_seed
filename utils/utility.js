'use strict';

var logger = require('../services/logger_service');


exports.httpResponse =  function(response, req, res, next){
    logger.debug("final response: " + JSON.stringify(response));
    return res.send(response);
}

exports.validationResponse =  function(validation_resp, req, res, next){
    logger.debug("validation response: " + JSON.stringify(validation_resp));

    if(validation_resp && validation_resp.status == 400){
        var x_response = {code:"RC0600", message:validation_resp.statusText + ", "+ validation_resp.errors[0].messages[0], errorDescription:JSON.stringify(validation_resp.errors) };
        logger.debug("Response sent: "+ JSON.stringify(x_response));
        res.status(200).json(x_response);
        return
    }
    else{
        return next();
    }
}

exports.parseReqBody =  function(req, res, next){
    var body = req.body;
    return next(null, body);
}

exports.serverException =  function(e, next){
    var error  = {code:"RC0500", message:"Internal Server Error!", errorDescription:e.message + ", type : " + e.type};
    if(typeof  next == "function"){
        return next(error);
    }else{
        return error;
    }

}

exports.serverError =  function(code, error, next){
    var error  = {code:code, message:"Other error", errorDescription: error};
    if(typeof  next == "function"){
        return next(error);
    }else{
        return error;
    }

}

exports.logHttpReq =  function(req, res, next){
    logger.info("route : " + req.originalUrl || req.url);
    logger.info("method : " + req.method);
    logger.verbose("headers: "+JSON.stringify(req.headers));
    logger.debug("body: "+JSON.stringify(req.body));

    return next();
}