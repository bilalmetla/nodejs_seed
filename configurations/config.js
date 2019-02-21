var constants = require("../constants");

module.exports = {

    port : 6000,
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
    email:{
        from:"hafiz.bsse2605@iiu.edu.pk",
        services: "gmail",
        password : "blockchain2605",
        otp :{           
            subject : "no-reply-emailVerification",
            html : "Type this code to signup ",
        }
    },
    supportedDB : constants.supportedDatabases.nedb
}