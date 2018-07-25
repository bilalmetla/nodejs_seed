'use strict';

var joi = require("joi");


module.exports = {

    getUsers: {
        body: {}
    },
    signup: {
        body: {
            payload: joi.object({
                firstName: joi.string().required(),
                email: joi.string().email().required(),
                username: joi.string().required(),
                passward: joi.string().required(),
                coinId: joi.number().required(),
                contactNumber: joi.number().required()
                
               // sessionId: joi.string().required(),
            }).required(),
            //requestId: joi.string().required()
        }
        
    },
    login: {
        body: {
            payload: joi.object({
                username: joi.string().required(),
                passward: joi.string().required()
               
               // sessionId: joi.string().required(),
            }).required(),
            //requestId: joi.string().required()
        }
        
    },
}