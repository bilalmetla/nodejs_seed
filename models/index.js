
var users = require('./user_model');
var accounts = require('./accounts_model');
var coins = require('./coins_model');
var otp = require('./otp_model');
var transaction = require('./transaction_model');
var profile = require('./profile');
var sahulat = require('./sahulat_model');

module.exports = {
    users: users,
    coins: coins,
    accounts: accounts,
    otp: otp,
    transaction: transaction,
    profile: profile,
    sahulat: sahulat
}