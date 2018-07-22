'use strict';

var joi = require("joi")


module.exports = {

    getUsers: {
        body: {}
    },
    signup: {
        body: {
            payload: joi.object({
                firstName: joi.string().required(),
                lastName: joi.string().required(),
                username: joi.string().required(),

                sessionId: joi.string().required(),
            }),
            requestId: joi.string().required()
        }
    },
}