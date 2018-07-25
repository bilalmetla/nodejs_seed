var db = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbConnection = "";
var logger = require('../services/logger_service');
//Connecting to database
 function doConnect(){
    db.connect(url, function(err, client) {
        if (err){
             logger.error("db connection error: "+err);
        }
        dbConnection= client.db("database");
    });
}

doConnect();
exports.read = function (data, callback) {
    logger.debug("read query data : "+ JSON.stringify(data));
    var collection = data.collection;
    var where = data.where || {};
    logger.debug("read query where : "+ JSON.stringify(where));
        dbConnection.collection(collection).find(where).toArray(function(err, results){
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
    dbConnection.collection(collection).insertOne(data.payload, function(err, results){
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
