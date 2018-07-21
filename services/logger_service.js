
var configs = require(process.env.CONFIG || "../configurations");
var path = require('path');
var winston = require('winston');

var logLevel = configs.tracing.level;
var logger;


winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'green',
    verbose: 'blue'
});

var transportsList =  [];

if(configs.tracing.consoleMode){
    transportsList.push(new(winston.transports.Console)({
        level: logLevel,
        colorize: true,
        timestamp: function () {
            return (new Date()).toLocaleTimeString();
        },
        prettyPrint: true
    }));
}

if(configs.tracing.fileMode){
    transportsList.push(new(winston.transports.File)({
        level: logLevel,
        filename: process.cwd() + '/node_traces.log',
        timestamp: function () {
            return (new Date()).toLocaleTimeString();
        },
        prettyPrint: true
    }));
}

var logger = new (winston.Logger)({
    transports: transportsList,
    exceptionHandlers: [
        new(winston.transports.File)({
            level: logLevel,
            filename: process.cwd() + '/exceptions.log',
            timestamp: function () {
                return (new Date()).toLocaleTimeString();
            },
            prettyPrint: true
        })
    ]
});


module.exports = logger;

