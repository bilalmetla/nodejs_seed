var db = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var logger = require('../services/logger_service');

exports.read = function (data, callback) {
    logger.debug("read query data : "+ JSON.stringify(data));
    var collection = data.collection;
    var where = data.where || {};
    logger.debug("read query where : "+ JSON.stringify(where));
    db.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("database");
        dbo.collection("users").find({}).toArray(function(err, results){
        if(err){
            logger.debug("db error : ");
            logger.debug(err);
            return callback(err, results);
        }
        logger.debug("db result : "+ JSON.stringify(results));
        return callback(err, results);
    });
    });
}

//SignUP
exports.signup = function (data, callback) {
    logger.debug("read query data : "+ JSON.stringify(data));
    var collection = data.collection;
    var where = data.where || {username: "hamza"}//{username:"bilal"};
    logger.debug("read query where : "+ JSON.stringify(where));
    db[collection].find(where, function(err, results){
        if(err){
            logger.debug("db error : ");
            logger.debug(err);
            return callback(err, results);
        }
        logger.debug("db result : "+ JSON.stringify(results));
        return callback(err, results);
    });
}


exports.create = function (data, callback) {
    logger.debug("create query data : "+ JSON.stringify(data.payload));
    var collection = data.collection;
    db[collection].create(data.payload, function(err, results){
        if(err){
            logger.debug("db error : ");
            logger.debug(err);
            return callback(err, results);
        }
        logger.debug("db result : "+ JSON.stringify(results));
        return callback(err, results);
    });
}

exports.update = function (data, callback) {
    logger.debug("update query data : "+ JSON.stringify(data.payload));
    var collection = data.collection;
    var where = data.where || {};
    logger.debug("update query where : "+ JSON.stringify(where));
    db[collection].update(data.payload, where, function(err, results){
        if(err){
            logger.debug("db error : ");
            logger.debug(err);
            return callback(err, results);
        }
        logger.debug("db result : "+ JSON.stringify(results));
        return callback(err, results);
    });
}
