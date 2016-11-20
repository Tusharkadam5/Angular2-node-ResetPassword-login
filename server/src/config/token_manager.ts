
var jwt = require('jsonwebtoken');
var config = require('../config/config');

var TOKEN_EXPIRATION = 60;
var TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60;



// Middleware for token verification
exports.verifyToken = function (req, res, next) {
	//var token = req.body.token || req.headers['x-access-token'];
        if (req.headers.authorization) {
        var token = req.headers.authorization.split(' ')[1];

	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, config.secret, function(err, user) {			
			if (err) {
                            console.log(err);
                            //return res.send(err);
                           return res.status(401).send({ 
                                    success: false, 
                                    message:err.message // 'Failed to authenticate token.'
                            });
		
			} else {
				// if everything is good, save to request for use in other routes
				req.user = user;	
				next();
			}
		});
	} else {
            return res.status(403).send({ 
            success: false, 
            message: 'No token provided. Please Login Again.' 
            });;
	}
    }else{
        // console.log('222222222222222222222222 ');
        return res.status(403).send({ 
        success: false, 
        message: 'No token provided. Please Login Again.' 
        });;
    }
};

/*

exports.expireToken = function(headers) {
	var token = getToken(headers);
	
	if (token != null) {
        redisClient.set(token, { is_expired: true });
    	redisClient.expire(token, TOKEN_EXPIRATION_SEC);
	}
};
*/
var getToken = function(headers) {
	if (headers && headers.authorization) {
		var authorization = headers.authorization;
		var part = authorization.split(' ');

		if (part.length == 2) {
			var token = part[1];

			return part[1];
		}
		else {
			return null;
		}
	}
	else {
		return null;
	}
};



exports.TOKEN_EXPIRATION = TOKEN_EXPIRATION;
exports.TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION_SEC;