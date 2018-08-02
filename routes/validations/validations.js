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
                coinId: joi.string().required(),
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
    createAccount:{
        body:{
            payload: joi.object({
                accountTitle: joi.string().required(),
                coinId: joi.string().required(),
                Balance: joi.number().required(),
                userId: joi.string().required()

            }).required(),
        }
    },
    getAccounts:{
        body:{

        }
    },
    updateAccount:{
        body:{
            payload: joi.object({
                accountTitle: joi.string().required(),
                accountId: joi.string().required()
            }).required(),
        }
    },
    deleteAccount:{
        body:{
            payload: joi.object({
                accountTitle: joi.string().required()
            }).required(),
        }
    },
    getCoins: {
        body:{

        }
    },
    
}