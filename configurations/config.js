var constants = require("../constants");

module.exports = {

    port : 3000,
    tracing:{
        level : "debug",
        consoleMode : true,
        fileMode : true,
    },
    database :{
        mongodb :{
            ip : "localhost",
            port : "27017",
            prefix : "mongodb://",
            database : "database",
            username :"",
            password :"",
        }
    },
    supportedDB : constants.supportedDatabases.nedb
}