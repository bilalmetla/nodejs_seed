'use strict';

var requestBroker = require('./request_broker_ctrl');
var logger = require('../services/logger_service');
var constants = require('../constants/');
var utils = require('../utils');
var async = require('async');
var sessionManager = require('./session_manager_ctrl');

exports.index = function (req, res, next){
    return next("Hello word")
}

exports.getAllUsers = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        data.payload = req.body.payload;
        data.serveFrom = constants.servingFromDB;
        data.route = "getAllUsers";
        async.waterfall([

            function(callback){
                requestBroker.send(data, function (error, response) {
                    return callback(error, response);
                });
            }

        ], function(err, results){
            if(err){
                return next(err);
            }
            else{
                return next(results);
            }
        });


    }catch(e){
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}

exports.signup = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        data.payload = req.body.payload;
        data.serveFrom = constants.servingFromDB;
        data.route = "signup";
        async.waterfall([

            function(callback){
                requestBroker.send(data, function (error, response) {
                    return callback(error, response);
                });
            }

        ], function(err, results){
            if(err){
                return next(err);
            }
            else{
                return next(results);
            }
        });


    }catch(e){
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}

exports.login = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        data.payload = req.body.payload;
        data.serveFrom = constants.servingFromDB;
        data.route = "login";
        async.waterfall([

            function(callback){
                requestBroker.send(data, function (error, response) {
                    return callback(error, response);
                });
            },
            function(response, callback){
                if(response.length==0){
                    var error ={code: "RC002", message: "User not exist" }             
                    return callback(error);
                }
                if(response[0].passward!= data.payload.passward){
                    var error ={code: "RC001", message: "Passward does not match" }
                    return callback(error);
                }
                sessionManager.createSession(req, response);
                var result = {code: "RC0200", message: "Successfull",result:response};
                return callback(null,result);
            }

        ], function(err, results){
            if(err){
                return next(err);
            }
            else{
                return next(results);
            }
        });


    }catch(e){
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }

}
