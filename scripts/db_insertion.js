var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("database");
  var myobj = { firstName:"abdullah",email:"abdullah.bsse2594@iiu.edu.pk",username:"abdullah2594",passward:"2594",coinId:"5b61a1700570d83790c33f73",contactNumber:3365764590};
  dbo.collection("accounts").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
