'use strict';

var requestBroker = require('./request_broker_ctrl');
var logger = require('../services/logger_service');
var constants = require('../constants/');
var utils = require('../utils');
var async = require('async');
var sessionManager = require('./session_manager_ctrl');
var emailSender = require('../services/email_service');
var configs = require('../configurations');
var flag = true;

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
        let data  = {};
        let condition  = {};
        data = req.body.payload;
        condition.serveFrom = constants.servingFromDB;
        async.waterfall([      
            function(callback){
                condition.route = "otpConf";
                requestBroker.send(data,condition, function (error, response) {
                    if(error){
                        return callback(error, response);
                    }else{
                        return callback(error, response);
                    }
                });
            },
            function(response, callback){
                if(response.length>0){
                    condition.route = "signup";
                    requestBroker.send(data,condition, function (error, response) {
                    var error ={"result":{code: "200", message: "Successfull",result:response  } }            
                    return callback(error, response);
                });
                }else{
                    var error ={code: "RC005", message: "Not Authorize to signup" }
                    return callback(error); 
                }
                
            },
            
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
        let condition = {}
        data = req.body.payload;
        condition.serveFrom = constants.servingFromDB;
        condition.route = "login";
        async.waterfall([

            function(callback){
                requestBroker.send(data,condition, function (error, response) {
                    return callback(error, response);
                });
            },
            function(response, callback){
                if(response.length==0){
                    var error ={"result":{code: "400", message: "User not exist",result:"0"  } }            
                    return callback(error);
                }
                if(response[0].passward!= data.passward){
                    var error ={"result":{code: "001", message: "Passward does not match",result:"0" }}
                    return callback(error);
                }
                sessionManager.createSession(req, response[0]);
                var result = {"result":{code: "0200", message: "Successfull",result:response[0].clientId}};
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
        let condition = {}
        data = req.body.payload;
        condition.serveFrom = constants.servingFromDB;
        condition.route = "createAccount";
        async.waterfall([

            function(callback){
                requestBroker.send(data,condition, function (error, response) {
                    return callback(error, response);
                });
            },
            function(response, callback){
                if(response.insertedCount!=1){
                    var error ={"result":{code: "002", message: "Can not create account" } }            
                    return callback(error);
                }
                else{
                    var result = {"result":{code: "0200", message: "Successfull",result:response.insertedCount}};
                    return callback(null,result);
                }
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
        let condition = {}
        data = req.body.payload;
        condition.serveFrom = constants.servingFromDB;
        condition.route = "updateAccount";
        async.waterfall([

            function(callback){
                requestBroker.send(data,condition, function (error, response) {
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
        let condition = {}
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        data.clientId = req.params.id;
        condition.serveFrom = constants.servingFromDB;
        condition.route = "getAccounts";
        async.waterfall([
            function(callback){
                requestBroker.send(data,condition, function (error, response) {
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
        let condition  = {};
        var otp = Math.floor(100000 + Math.random() * 900000)
        let body = JSON.parse(req.body.payload);
        var emailReciever = body.email;
        data.otp = otp;
        data.email = emailReciever;
        data.isUsed = false;
        //Sending mail
        emailSender.sendMail(otp,emailReciever);
        //end       
        condition.serveFrom = constants.servingFromDB;
        condition.route = "sendOtp";
        async.waterfall([
            function(callback){
                requestBroker.send(data,condition, function (error, response) {
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

exports.createTransaction = function(req, res, next){
    try{
        let condition = {}
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        data = req.body.payload;
        condition.serveFrom = constants.servingFromDB;
        condition.route = "createTransaction";
        async.waterfall([
            function(callback){
                requestBroker.send(data,condition, function (error, response) {
                    return callback(error, response);
                });
            },
            function(response, callback){
                if(response.insertedCount!=1){
                    var error ={"result":{code: "002", message: "Can not create transactions" } }            
                    return callback(error);
                }
                else{
                    var result = {"result":{code: "0200", message: "Successfull",result:response}};
                    return callback(null,result);
                }                
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

exports.getBalance = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        let condition = {}
        data = req.body.payload;
        condition.serveFrom = constants.servingFromDB;
        condition.route = "getBalance";
        async.waterfall([
            function(callback){
                requestBroker.send(data,condition, function (error, response) {
                    return callback(error, response);
                });
            },function(response, callback){
                if(response.length==0){
                    var error ={"result":{code: "002", message: "Address does not exist" } }            
                    return callback(error);
                }
                else{
                    var result = {"result":{code: "0200", message: "Successfull",result:response}};
                    return callback(null,result);
                }                
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

exports.getBlock = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        let condition = {}
        data.height = req.params.height;
        condition.serveFrom = constants.servingFromDB;
        condition.route = "getBlock";
        async.waterfall([
            function(callback){
                requestBroker.send(data,condition, function (error, response) {
                    return callback(error, response);
                });
            },function(response, callback){
                if(response.length==0){
                    var error ={"result":{code: "002", message: "Block not found" } }            
                    return callback(error);
                }
                else{
                    var result = {"result":{code: "0200", message: "Successfull",result:response}};
                    return callback(null,result);
                }                
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

exports.getCurrentGasPrice = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        let condition = {}
        data = req.body.payload;
        condition.serveFrom = constants.servingFromDB;
        condition.route = "getCurrentGasPrice";
        async.waterfall([

            function(callback){
                requestBroker.send(data,condition, function (error, response) {
                    return callback(error, response);
                });
            },
            function(response, callback){
                if(response.length==0){
                    var error ={"result":{code: "002", message: "error finding current gas price" } }            
                    return callback(error);
                }
                else{
                    var result = {"result":{code: "0200", message: "Successfull",result:response}};
                    return callback(null,result);
                }                
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

exports.getTransactions = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        data.clientId = req.params.id
        let condition = {}
        condition.serveFrom = constants.servingFromDB;
        condition.route = "getTransactions";
        async.waterfall([
            function(callback){
                requestBroker.send(data,condition, function (error, response) {
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


exports.savefeedback = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        let condition = {}
        data = req.body.payload;    
        condition.serveFrom = constants.servingFromDB;
        condition.route = "feedback";
        async.waterfall([
            function(callback){
                requestBroker.send(data,condition, function (error, response) {
                    return callback(error, response);
                });
            },
            function(response, callback){
                if(response.insertedCount!=1){
                    var error ={"result":{code: "400", message: "User not exist",result:"0"  } }            
                    return callback(error);
                }else{
                    sessionManager.createSession(req, response[0]);
                    var result = {"result":{code: "0200", message: "Successfull"}};
                    return callback(null,result);
                }

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

exports.editprofile = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        let condition = {}
        data = req.body.payload;
        condition.serveFrom = constants.servingFromDB;
        condition.route = "editprofile";
        async.waterfall([
            function(callback){
                requestBroker.send(data,condition, function (error, response) {
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

exports.createProfile = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        let condition = {}
        data = req.body.payload;
        condition.serveFrom = constants.servingFromDB;
        condition.route = "createProfile";
        async.waterfall([
            function(callback){
                requestBroker.send(data,condition, function (error, response) {
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

exports.getProfile = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        let condition = {}
        data.clientId = req.params.clientId;
        condition.serveFrom = constants.servingFromDB;
        condition.route = "getProfile";
        async.waterfall([

            function(callback){
                requestBroker.send(data,condition, function (error, response) {
                    var error ={"result": response[0] }            
                    return callback(error, );
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

exports.getHistory = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        let condition = {}
        condition.serveFrom = constants.servingFromDB;
        condition.route = "getHistory";
        async.waterfall([

            function(callback){
                requestBroker.send(data,condition, function (error, response) {
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
    

exports.getSahulatUser = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        let condition = {}
        condition.serveFrom = constants.servingFromDB;
        condition.route = "getSahulatUser";
        data.address = req.params.address
        async.waterfall([
            function(callback){
                requestBroker.send(data,condition, function (error, response) {
                    let res = {}
                    res.done = response
                    var result ={"result": res }            
                    return callback(error, result);
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

exports.sahulatSignup = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        let condition = {}
        data = req.body.payload;
        condition.serveFrom = constants.servingFromDB;
        condition.route = "sahulatSignup";
        async.waterfall([
            function(callback){
                requestBroker.send(data,condition, function (error, response) {
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

exports.sahulatPlacingJobs = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        let condition = {}
        data = req.body.payload;
        condition.serveFrom = constants.servingFromDB;
        condition.route = "sahulatPlacingJobs";
        async.waterfall([
            function(callback){
                requestBroker.send(data,condition, function (error, response) {
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

exports.sahulatApplying = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        let condition = {}
        data = req.body.payload;
        condition.serveFrom = constants.servingFromDB;
        condition.route = "sahulatApplying";
        async.waterfall([
            function(callback){
                requestBroker.send(data,condition, function (error, response) {
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

exports.sahulatBids = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        let condition = {}
        data = req.body.payload;
        condition.serveFrom = constants.servingFromDB;
        condition.route = "sahulatBids";
        async.waterfall([
            function(callback){
                requestBroker.send(data,condition, function (error, response) {
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

exports.sahulatgetJobs = function(req, res, next){
    try{
        logger.debug("request body : " + JSON.stringify(req.body));
        var data  = {};
        let condition = {}
        // data = req.body.payload;
        condition.serveFrom = constants.servingFromDB;
        condition.route = "sahulatgetJobs";
        async.waterfall([
            function(callback){
                requestBroker.send(data,condition, function (error, response) {
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