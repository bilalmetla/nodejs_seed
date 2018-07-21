'use strict';

exports.httpResponse =  function(response, req, res, next){
    return res.send(response);
}