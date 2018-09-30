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
                contactNumber: joi.number().required(),
                otpCode: joi.number().required()
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
                balance: joi.number().required(),
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
                newaccountTitle: joi.string().required(),
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
    createCoins: {
        body:{
            payload: joi.object({
                symbol: joi.string().required(),
                rate: joi.number().required(),
                coinName: joi.string().required()
            }).required(),
        }
    },
    sendotp:{
        body:{
            payload: joi.object({
                email: joi.string().email().required(),
                    contactNumber: joi.number().required()
            }).required(),
        }
    },
    createTransaction:{
        body:{
            payload: joi.object({
                accountTitle: joi.string().required(),
                amountTransfer: joi.number().required(),
                walletAddress: joi.string().required(),
            }).required(),
        }
    },
    getTransaction: {
        body:{

        }
    },
    
    
}