"use strict";
var configs = require("../configurations");
var constants = require("../constants");

if(configs.supportedDB == constants.supportedDatabases.mongodb){

    var mongodb = require("./mongodb");
    module.exports = mongodb
}

if(configs.supportedDB == constants.supportedDatabases.nedb){

    var nedb = require("./nedb");
    module.exports = nedb;
}
