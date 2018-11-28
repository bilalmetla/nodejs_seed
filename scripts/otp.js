var nodemailer = require('nodemailer');
var email = "hafiz.bsse2605@iiu.edu.pk";

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'hafiz.bsse2605@iiu.edu.pk',			//email ID
	    pass: 'hamzisumbuli'				//Password 
    }
});
function sendMail(otp){
	var details = {
		from: email, // sender address same as above
		to: 'javed.hamza816@gmail.com', 					// Receiver's email id
		subject: 'no-reply-emailVerification', // Subject of the mail.
		html: otp					// Sending OTP 
	};


	transporter.sendMail(details, function (error, data) {
		if(error)
			console.log(error)
		else
			console.log(data);
		});
	}
	
	
	var otp = "This is no reply email just to inform you that you are intahai chawal admi ";
	sendMail(otp);
