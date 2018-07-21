'use strict';

exports.httpResponse =  function(response, req, res, next){
    return res.send(response);
}

exports.parseReqBody =  function(req, res, next){
    var body = req.body;
    return next(null, body);
}