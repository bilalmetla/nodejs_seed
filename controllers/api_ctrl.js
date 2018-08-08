'use strict';

var requestBroker = require('./request_broker_ctrl');
var logger = require('../services/logger_service');
var constants = require('../constants/');
var utils = require('../utils');
var async = require('async');
var sessionManager = require('./session_manager_ctrl');
var nodemailer = require('nodemailer');
var configs = require("../configurations");

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
        data.route = "users";
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
                sessionManager.createSession(req, response[0]);
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

exports.createAccount = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        data.payload = req.body.payload;
        data.serveFrom = constants.servingFromDB;
        data.route = "createAccount";
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

exports.updateAccount = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        data.payload = req.body.payload;
        data.serveFrom = constants.servingFromDB;
        data.route = "updateAccount";
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

exports.deleteAccount = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        data.payload = req.body.payload;
        data.serveFrom = constants.servingFromDB;
        data.route = "deleteAccount";
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

/* for getting all coins*/
exports.getAllCoins = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        data.payload = req.body.payload;
        data.serveFrom = constants.servingFromDB;
        data.route = "getAllCoins";
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

/* for getting all accounts of specific user*/
exports.getAccounts = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        data.payload = req.body.payload;
        data.serveFrom = constants.servingFromDB;
        data.route = "getAccounts";
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


exports.createCoins = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        data.payload = req.body.payload;
        data.serveFrom = constants.servingFromDB;
        data.route = "createCoins";
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

exports.sendOtp = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        var otpObj = {};
        var otp = Math.floor(100000 + Math.random() * 900000)
        otpObj.otp = otp;
        otpObj.contactNumber = req.body.payload.contactNumber;
        data.payload = otpObj;
        //Sending mail
        var transporter = nodemailer.createTransport({
            service: configs.otpOwner.otp.services,
            auth: {
                   user: configs.otpOwner.otp.email,			//email ID
                   pass: configs.otpOwner.otp.password			//Password 
               }
           });
           function sendMail(otp){
               var details = {
                   from: configs.otpOwner.otp.email, // sender address same as above
                   to: 'reciever mail', 					// Receiver's email id
                   subject: configs.otpOwner.otp.subject, // Subject of the mail.
                   html: configs.otpOwner.otp.html + otp					// Sending OTP 
               };
           
           
               transporter.sendMail(details, function (error, data) {
                   if(error)
                       console.log(error)
                   else
                       console.log(data);
                   });
               }
               sendMail(otp.toString() );
        //end       
        data.serveFrom = constants.servingFromDB;
        data.route = "sendOtp";
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



						