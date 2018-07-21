var Datastore = require('nedb');
var db = {};
//db.users = new Datastore('./users.db');
//db.users.loadDatabase();
db.users = new Datastore({ filename: './users.db', autoload: true });

//db.users = new Datastore({ filename: './users.db', autoload: true });
var logger = require('../services/logger_service');

exports.read = function (data, callback) {
    logger.debug("read query data : "+ JSON.stringify(data));
    var collection = data.collection;
    var where = data.where || {username:"bilal"};
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
