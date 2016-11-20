var User = require('mongoose').model('user');
import crypto = require('crypto');
//var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var moment = require('moment');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//var flash = require('connect-flash');


var getErrorMessage = function(err) {
	var message = '';
   
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	}
	else {
		for (var errName in err.errors) {
			if (err.errors[errName].message)
				message = err.errors[errName].message;
		}
	}

	return message;
};


exports.register = function(req, res, next) {
     

            //if (req.body.password === req.body.confirmpass) {
                //if (req.body.password.length > 3) {
				var tokenid = crypto.randomBytes(20).toString('hex');

                  var user = new User({
                            email              : req.body.email,
                            //password           : req.body.password,
                            companyname        : req.body.companyname,
                            phone              : req.body.phone,
                            token             : tokenid

                    });

                    user.save(function(err) {
                            if (err) {
							var message = getErrorMessage(err);
							return res.send({ 
                                        success: false, 
                                        message: message
                                        });
                            }
							//console.log(user.email);
							sendemail(tokenid, res, user.email)
                           /* return res.status(200).send({ 
                            success: true, 
                            message: 'Your account has been created.'
                            });*/
                          
                        });

                

                
	//}else {
	//	return res.redirect('/');
	//}
};

exports.logout = function(req, res) {
	if (req.user) {
		//tokenManager.expireToken(req.headers);
                //delete req.decoded;
		delete req.user;	
		return res.sendStatus(200);
	}
	else {
		return res.sendStatus(401);
	}
};

exports.list = function(req, res, next) {
    
	User.find({}, function(err, users) {
		if (err) {
			//return next(err);
			return res.status(401).send({ 
			success: false, 
			message: err
                        });
		}
		else {
                    
                    //console.log(users);
                   // console.log(moment(users.lastlogin).format('MM/DD/YYYY'));
                       return res.json(users);
                      
                        /* res.render('users/userslist', {
                            title: 'Users',
                            users:users
                        });*/
		}
	});
};

exports.reset = function(req, res) {
	var tokenid  = req.params.token || '';
	var password = req.body.password || '';
	//console.log(req.params.token);
	//console.log('---------------------------------------------------');
if (req.body.password === req.body.confpassword) {	
	if (tokenid == '' || password == '' ) {
		 return res.send({ 
			success: false, 
			message: 'Token id is empty. Please try again.'
                        });
	}
	
	User.findOne({token: tokenid}, function (err, user) {
		if (err) {
			console.log(err);
			//return res.sendStatus(401);
			return res.send({ 
			success: false, 
			message: 'Failed. Somthing is wrong.'
			});
		}

		if (user == undefined) {
                        return res.send({ 
						success: false, 
						message: 'User not found.'
                        });
                       
		}
		if (password) {
			var md5 = crypto.createHash('md5');
			var updatedpass =  md5.update(password).digest('hex');
		}
		var conditions = { _id: user._id };
		var update = {$set:{password: updatedpass}};
		var options = { upsert: true };

		User.update(conditions, update, options, function(err, userobj) {
			if (err) {
			  console.log('update error');
			  return res.send({ 
				success: false, 
				message: 'Failed. Not Updated.'
				});
		  } else {
			 return res.send({
				success: true, 
				message: 'Updated successfully.'
				});
		  }
		}); 	
		
	});
	
}else{
	 return res.send({ 
				success: false, 
				message: "Password does not match the confirm password"
				});
	
}
};

exports.signin = function(req, res){
    var email = req.body.email || '';
	var password = req.body.password || '';
	

	if (email == '' || password == '') { 
		 return res.send({ 
			success: false, 
			message: 'Please enter the blank field.'
                        });
	}

	User.findOne({email: email}, function (err, user) {
		if (err) {
			console.log(err);
			//return res.sendStatus(401);
			return res.status(401).send({ 
			success: false, 
			message: 'Authentication failed. Password is wrong.'
			});
		}

		if (user == undefined) {
			//return res.sendStatus(401);
                        return res.send({ 
						success: false, 
						message: 'user not found.'
                        });
                       // res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		}
		
		 
			if (user.comparePassword(password)) {
							user.password = undefined;
                            delete user.password;
							user.token = undefined;
                            delete user.token;
							

                            var token = createJwtToken(user);
                            req.user = user;
                            return res.json({ success: true, message: 'You have successfully logged in!', token: token, user: user });
                              
                                
                        }else{
                                console.log("Attempt failed to login with " + user.email);
				//return res.sendStatus(401);
                                 return res.send({ 
                                    success: false, 
                                    message: "Attempt failed to login with " + user.email
                                    });
                        }

			
		

	});
};

/**
 * Delete an report
 */
exports.delete = function (req, res) {
  var userId  = req.params.userId || '';
console.log(userId);
 User.findOne({ _id: userId }, function(err, user) {
 // if (err) throw err;

  // delete him
  user.remove(function(err) {
    if (err) {
		return res.status(401).send({ 
                            success: false, 
                            message: 'User not deleted! try again'
                            });
	}

	return res.status(200).send({ 
                            success: true, 
                            message: 'User successfully deleted!'
                            });
    //console.log('User successfully deleted!');
  });
});
};

exports.isUser = function (req, res, next) {
//console.log(req.user);
    var usr = req.user.user || req.user;
    if (usr) {

       if (usr.roles === 'user') {
         return next();
       } else {
         return res.status(401).send({ 
                            success: false, 
                            message: 'Permissions not allwed.'
                            });
       }
    } else {
      return res.status(401).send({ 
                            success: false, 
                            message: 'you need to login with admin creadinstiol.'
                            });
    }
};

/**
 * Create token 
 */
function createJwtToken(user) {

  var payload = {
    user: user,
    jti: "aa7f8daa7f8d0a95c0a95c",
    iat: moment().add().valueOf(),
    exp:  moment().add('minutes', 1).valueOf()
  };
  return jwt.sign(payload, config.secret);
}


// send email


function sendemail(tokenid, res, email){
 
// create reusable transporter object using the default SMTP transport 
//var transporter = nodemailer.createTransport('smtps://thr.kdm%40gmail.com:pass$@smtp.gmail.com');

 var transporter = nodemailer.createTransport(smtpTransport({
    host: config.smtp.credentials.host, //'smtp.gmail.com', //localhost
    port: 465,
    auth: {
        user: config.smtp.credentials.user, //'thr.kdm@gmail.com', // put your email id here
        pass: config.smtp.credentials.password, //'pass' // password here
    }
}));

var sendPwdReset = transporter.templateSender({
    subject: 'Password reset for {{username}}!',
    text: 'Hello, {{username}}, Please go here to reset your password: {{ reset }}',
    html: '<b>Hello, <strong>{{username}}</strong>, Please <a href="{{ reset }}">go here to reset your password</a>: {{ reset }}</p><br> Thanks,'

}, {
    from: config.systemEmail,
});

sendPwdReset({
    to: ''+email+', '+ config.systemEmail
}, {
    username: email, //'Node Mailer',
    reset: 'http://localhost:3000/#/resetpassword/'+tokenid
}, function(err, info){
    if(err){
        console.log('Error');
    }else{
        console.log('Password reset sent');
		return res.status(200).send({ 
		success: true, 
		message: 'Your account has been created. Please check in your mail account. '
		});
    }
});



}