var mongoose = require('mongoose');
import crypto = require('crypto');

//User Account Schema here
var reg_user = new mongoose.Schema({  
	email              : {type: String, required:true, index: {unique: true}},
	password           : {type: String},
    phone              : { type: Number},
	companyname        : {type: String, required: true},
	token				: {type: String}
	
});


reg_user.pre('save', function(next) {
		if (this.password) {
			var md5 = crypto.createHash('md5');
			this.password =  md5.update(this.password).digest('hex');
		}

		next();
	}
);

/*reg_user.methods.authenticate = function(password) {
	var md5 = crypto.createHash('md5');
	md5 = md5.update(password).digest('hex');

	return this.password === md5;
};*/

reg_user.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne(
		{name: possibleUsername},
		function(err, user) {
			if (!err) {
				if (!user) {
					callback(possibleUsername);
				}
				else {
					return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
				}
			}
			else {
				callback(null);
			}
		}
	);
};


//Password verification
reg_user.methods.comparePassword = function(password) {
	var md5 = crypto.createHash('md5');
	 md5 = md5.update(password).digest('hex');
	return this.password === md5;
};



var regUserSchema = mongoose.model('user', reg_user);  