'use strict';

var requestBroker = require('./request_broker_ctrl');
var logger = require('../services/logger_service');
var constants = require('../constants/');
var utils = require('../utils');
var async = require('async');

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
