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
                email: joi.string().required(),
                username: joi.string().required(),
                passward: joi.string().required(),
                contactNumber: joi.string().required(),
                otpCode: joi.number().required()
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
    editprofile: {
        body: {
            payload: joi.object({
                username: joi.string().required(),
                email: joi.string().required(),
                contact: joi.string().required(),
                address: joi.string().required(),
                designation: joi.string().required(),
                country: joi.string().required(),
                city: joi.string().required(),
                clientid: joi.string().required()
            }).required()
        }
        
    },
    createProfile: {
        body: {
            payload: joi.object({
                cnic: joi.string().required(),
                country: joi.string().required(),
                city: joi.string().required(),
                address: joi.string().required(),
                designation: joi.string().required(),
                contact: joi.string().required(),
                username: joi.string().required(),
                email: joi.string().required(),
                clientId: joi.string().required()    
            }).required(),
        }
    },
    getProfile: {
        body:{

        }
    },
    createAccount:{
        body:{
            payload: joi.object({
                accountTitle: joi.string().required(),
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
                accountTitle: joi.string().required(),
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
                recieverAddress: joi.string().required(),
                amountTransfer: joi.number().required(),
                walletAddress: joi.string().required(),
                clientId: joi.string().required(),
            }).required(),
        }
    },
    getTransaction: {
        body:{

        }
    },
    getBalance: {
        body:{
            payload: joi.object({
                address: joi.string().required(),
            }).required(),
        }
    },
    getBlock: {
        body:{
            payload: joi.object({
            address: joi.string().required(),
            }).required(),
        }
    },
    getGasPrice: {
        body:{

        }
    },
    getfeedback: {
        body:{
            payload: joi.object({
            clientId: joi.string().required(),
            subject: joi.string().required(),
            message: joi.string().required(),
            }).required(),
        }
    },
    getHistory: {
        body:{

        }
    },
    getSahulatUser: {
        body:{

        }
    },
    sahulatgetJobs: {
        body:{

        }
    },
    sahulatSignup: {
        body:{
            payload: joi.object({
            name: joi.string().required(),
            age: joi.number().required(),
            designation: joi.string().required(),
            qualification: joi.string().required(),
            experience: joi.string().required(),
            rateperhour: joi.string().required(),
            address: joi.string().required(),
            }).required(),
        }
    },
    sahulatPlacingJobs: {
        body:{
            payload: joi.object({
            jobname: joi.string().required(),
            responsibility: joi.string().required(),
            duration: joi.number().required(),
            salary: joi.number().required(),
            designation: joi.string().required(),
            department: joi.string().required(),
            address: joi.string().required(),
            }).required(),
        }
    },
    sahulatApplying: {
        body:{
            payload: joi.object({
            jobaddress: joi.string().required(),
            price: joi.number().required(),
            daystoComplete: joi.number().required(),
            address: joi.string().required(),
            }).required(),
        }
    },
    sahulatBids: {
        body:{
            payload: joi.object({
            address: joi.string().required(),
            }).required(),
        }
    },
    
}