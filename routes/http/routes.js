var sessionManager = require('../../controllers/session_manager_ctrl');
var express = require('express');
var router = express.Router();
var expressValidate = require('express-validation');
var apis = require('../../controllers/api_ctrl.js');
var utils = require('../../utils/') ;
var validations = require('../validations');


router.get('/', apis.index, utils.httpResponse);
/* GET users listing. */
router.get('/users', utils.logHttpReq, sessionManager.sessionChecker , expressValidate(validations.getUsers), apis.getAllUsers, utils.httpResponse);
//POST request for Signup
router.post('/signup', utils.logHttpReq, expressValidate(validations.signup), apis.signup, utils.httpResponse);
//POST request for login 

router.post('/login', utils.logHttpReq, expressValidate(validations.login), apis.login, utils.httpResponse);
/*GET coins listing.  */
router.get('/coins', utils.logHttpReq, expressValidate(validations.getCoins), apis.getAllCoins, utils.httpResponse );
/*GET accounts of specific users.  */
router.get('/accounts', utils.logHttpReq, expressValidate(validations.getAllAccounts), apis.getAllAccounts, utils.httpResponse);

module.exports = router;

