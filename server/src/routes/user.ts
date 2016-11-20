var index = require('../controllers/user');
var tokenManager = require('../config/token_manager');
var config = require('../config/config');
//var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
module.exports = function(app) {

    //app.route('/').get(index.render);

    app.route('/api/login').post(index.signin);
    app.route('/api/users').post(index.register);
	app.route('/api/reset/:token').put(index.reset);
    app.route('/api/users').get(tokenManager.verifyToken, index.list); //index.isUser,
    app.route('/api/users/:userId').delete(tokenManager.verifyToken, index.delete);
    app.route('/api/logout').get(tokenManager.verifyToken, index.logout);  
    


};
