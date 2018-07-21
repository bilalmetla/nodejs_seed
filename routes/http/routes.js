var express = require('express');
var router = express.Router();

var apis = require('../../controllers/api_ctrl.js');
var utils = require('../../utils/') ;


router.get('/', apis.index, utils.httpResponse);
/* GET users listing. */
router.get('/users', /*utils.parseReqBody,*/ apis.getAllUsers, utils.httpResponse);

module.exports = router;
