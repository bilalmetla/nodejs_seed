var express = require('express');
var router = express.Router();
var expressValidate = require('express-validation');

var apis = require('../../controllers/api_ctrl.js');
var utils = require('../../utils/') ;
var validations = require('../validations');


router.get('/', apis.index, utils.httpResponse);
/* GET users listing. */
router.get('/users', utils.logHttpReq, expressValidate(validations.getUsers), apis.getAllUsers, utils.httpResponse);

module.exports = router;
