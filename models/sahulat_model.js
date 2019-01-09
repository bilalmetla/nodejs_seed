var dbService = require('../database');
var utils = require('../utils');
var blockchain = require('../services/blockchain_services');

let getUser=true
exports.getSahulatUser = function(data, next){
    if(getUser){
        getUser=false
    try{    
        blockchain.sahulat.getbids(data,function(err,res){
        if(err){
            return next(err,null);
        }else{
            return next(null,res);
            getUser = false
                    }
        });
  
    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}
}
let sahulatsignup = true
exports.sahulatSignup = function(data, next){
    if(sahulatsignup){
        sahulatsignup=false
    try{
        let condition = {}
        condition.where = { address: data.address };
        condition.collection = "accounts"
        dbService.read(data,condition, function (err, result) {
            if(err){
                return next(err, result);
            }else{
                data.privateKey = result[0].privateKey 
        blockchain.sahulat.newRegisteration(data,function(err,res){
            if(err){
             return next(err,null);
            }else{
             return next(null,res);
             sahulatsignup=true
            }
        });
        }    
    }) 
    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}
}

let jobPlacementreq = true
exports.sahulatPlacingJobs = function(data, next){
    if(jobPlacementreq){
    try{    
        jobPlacementreq = false
        let condition = {}
        condition.where = { address: data.address };
        condition.collection = "accounts"
        dbService.read(data,condition, function (err, result) {
            if(err){
                return next(err, result);
            }else{
                data.privateKey = result[0].privateKey 
                blockchain.sahulat.newJobPlacement(data,function(err,res){
                if(err){
                 return next(err,null);
                }else{
                    let condition = {}
                    condition.collection = "sahulatJobs"
                    res.jobname = data.jobname
                    res.salary = data.salary
                    res.designation = data.designation
                    res.responsibility = data.responsibility
                    res.department = data.department 
                    res.duration = data.duration
                    dbService.create(res,condition, function (err, jobPlacementResult) {
                        return next(err, jobPlacementResult);
                        jobPlacementreq = true
                    });
                }    
            });
        }
    })  
    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }
    }
}

// exports.getSahulatUser = function(data, next){
//     try{    
//         blockchain.sahulat.viewJobs(data,function(err,res){
//             if(err){
//              return next(err,null);
//             }
//              return next(null,res);
//         });  
//     }catch (e) {
//         logger.error("Exception:" );
//         logger.error(e.stack);
//         utils.serverException(e, next);
//     }
// }


let sahulatApplying = true
exports.sahulatApplying = function(data, next){
    if(sahulatApplying){
    try{    
        sahulatApplying = false
        let condition = {}
        condition.where = { address: data.address };
        condition.collection = "accounts"
        dbService.read(data,condition, function (err, result) {
            if(err){
                return next(err, result);
            }else{
                data.privateKey = result[0].privateKey 
                blockchain.sahulat.sahulatApplying(data,function(err,res){
                if(err){
                    return next(err,null);
                }else{
                    let condition = {}
                condition.collection = "sahulatEmployee"
                res.jobaddress = data.jobaddress
                res.price = data.price
                res.daystoComplete = data.daystoComplete
                dbService.create(res,condition, function (err, jobPlacementResult) {
                 return next(err, jobPlacementResult);
                 sahulatApplying = true
             });
            }    
            });
        }
    })  
    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }
    }
}

let sahulatBids = true
exports.sahulatBids = function(data, next){
    if(sahulatBids){
    try{    
        sahulatBids = false
        let condition = {}
        condition.where = { address: data.address };
        condition.collection = "accounts"
        dbService.read(data,condition, function (err, result) {
            if(err){
                return next(err, result);
            }else{
                data.privateKey = result[0].privateKey 
            blockchain.sahulat.viewBidders(data,function(err,res){
                return next(null,res);  
             });  
            }
        })
    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }
    }
}

let sahulatgetJobs=true
exports.sahulatgetJobs = function(data, next){
    if(getUser){
        sahulatgetJobs=false
    try{    
        let condition = {}
        condition.collection = "sahulatJobs"
        dbService.read(data,condition, function (err, result) {
            sahulatgetJobs = true
            return next(err, result);
        });
    }catch (e) {
        logger.error("Exception:" );
        logger.error(e.stack);
        utils.serverException(e, next);
    }
}
}
