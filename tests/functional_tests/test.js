
var apis = require('./apis_suite');
var data = require("../data/trustcash_data");


describe('trustcash', function() {
    this.timeout(20000);

    it('login  /', function (done) {
        apis.login(data, done);

    });


});