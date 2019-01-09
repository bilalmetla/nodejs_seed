var sessionManager = require('../../controllers/session_manager_ctrl');
var express = require('express');
var router = express.Router();
var expressValidate = require('express-validation');
var apis = require('../../controllers/api_ctrl.js');
var utils = require('../../utils/') ;
var validations = require('../validations');


router.get('/', apis.index, utils.httpResponse);
/* GET users listing. */
router.get('/users', utils.logHttpReq, sessionManager.sessionChecker , expressValidate(validations.getUsers), utils.validationResponse, apis.getAllUsers, utils.httpResponse);
/*POST request for Signup */
router.post('/signup', utils.logHttpReq, expressValidate(validations.signup), utils.validationResponse, apis.signup, utils.httpResponse);
/*POST request for login */
router.post('/login', utils.logHttpReq, expressValidate(validations.login), utils.validationResponse, apis.login, utils.httpResponse);
/*put request for profile */
router.put('/profile', utils.logHttpReq, expressValidate(validations.editprofile), utils.validationResponse, apis.editprofile, utils.httpResponse);
/*POST request for profile */
router.post('/profile', utils.logHttpReq, expressValidate(validations.createProfile), utils.validationResponse, apis.createProfile, utils.httpResponse);
/*GET request for profile */
router.get('/profile/:clientId', utils.logHttpReq, expressValidate(validations.getProfile), utils.validationResponse, apis.getProfile, utils.httpResponse);
/*POST request for Signup*/
router.post('/accounts', utils.logHttpReq,expressValidate(validations.createAccount), utils.validationResponse, apis.createAccount, utils.httpResponse);
/*GET accounts of specific users.  */
router.get('/accounts/:id', utils.logHttpReq ,expressValidate(validations.getAccounts), utils.validationResponse, apis.getAccounts, utils.httpResponse);
/*GET accounts of specific users.  */
router.put('/accounts', utils.logHttpReq,expressValidate(validations.updateAccount), utils.validationResponse, apis.updateAccount, utils.httpResponse);
/*GET accounts of specific users.  */
router.delete('/accounts', utils.logHttpReq,expressValidate(validations.deleteAccount), utils.validationResponse, apis.deleteAccount, utils.httpResponse);
/*GET coins listing.  */    
router.get('/coins', utils.logHttpReq, expressValidate(validations.getCoins), utils.validationResponse, apis.getAllCoins, utils.httpResponse );
/*POST new coin.  */
router.post('/coins', utils.logHttpReq, expressValidate(validations.createCoins), utils.validationResponse, apis.createCoins, utils.httpResponse );
/*POST sendiOtp request.  */
router.post('/otp', utils.logHttpReq, utils.validationResponse, apis.sendOtp, utils.httpResponse );
/*POST request for Transaction*/
router.post('/transaction', utils.logHttpReq,expressValidate(validations.createTransaction), utils.validationResponse, apis.createTransaction, utils.httpResponse);
/*GET transactions listing.  */
router.get('/transaction/:id', utils.logHttpReq ,expressValidate(validations.getTransaction), utils.validationResponse, apis.getTransactions, utils.httpResponse);
/*GET Address Balance.  */
router.post('/balance', utils.logHttpReq ,expressValidate(validations.getBalance), utils.validationResponse, apis.getBalance, utils.httpResponse);
/*GET transactions listing.  */
router.post('/block/:height', utils.logHttpReq ,expressValidate(validations.getBlock), utils.validationResponse, apis.getBlock, utils.httpResponse);
/*GET transactions listing.  */
router.get('/gasprice', utils.logHttpReq ,expressValidate(validations.getGasPrice), utils.validationResponse, apis.getCurrentGasPrice, utils.httpResponse);
/*POST feedback.  */
router.post('/feedback', utils.logHttpReq ,expressValidate(validations.getfeedback), utils.validationResponse, apis.savefeedback, utils.httpResponse);
/*GET request for historical data.  */
router.get('/history', utils.logHttpReq ,expressValidate(validations.getHistory), utils.validationResponse, apis.getHistory, utils.httpResponse);
/*GET request for Sahulat View User.  */
router.get('/sahulat/viewuser/:address', utils.logHttpReq ,expressValidate(validations.getSahulatUser), utils.validationResponse, apis.getSahulatUser, utils.httpResponse);
/*POST request for Sahulat Register User.  */
router.post('/sahulat/signup', utils.logHttpReq ,expressValidate(validations.sahulatSignup), utils.validationResponse, apis.sahulatSignup, utils.httpResponse);
/*POST request for Sahulat Placing Jobs.  */
router.post('/sahulat/jobs', utils.logHttpReq ,expressValidate(validations.sahulatPlacingJobs), utils.validationResponse, apis.sahulatPlacingJobs, utils.httpResponse);
/*POST request for Sahulat Placing Jobs.  */
router.post('/sahulat/apply', utils.logHttpReq ,expressValidate(validations.sahulatApplying), utils.validationResponse, apis.sahulatApplying, utils.httpResponse);
/*POST request for Sahulat Placing Jobs.  */
router.post('/sahulat/bids', utils.logHttpReq ,expressValidate(validations.sahulatBids), utils.validationResponse, apis.sahulatBids, utils.httpResponse);
/*GEET request for Sahulat getting Jobs.  */
router.get('/sahulat/jobs', utils.logHttpReq ,expressValidate(validations.sahulatgetJobs), utils.validationResponse, apis.sahulatgetJobs, utils.httpResponse);

module.exports = router;

