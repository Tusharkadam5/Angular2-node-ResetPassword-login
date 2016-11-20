/// <reference path="../typings/index.d.ts" />

import express = require('express');
var config = require("./config/config");
import bodyParser = require("body-parser");
import multer = require("multer");
import mongoose = require('mongoose');

//var mongodb = {
//  uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://127.0.0.1/taskAng2'
//};

import path = require('path');
var port: number = process.env.PORT || 3000;
var env:string = process.env.NODE_ENV || 'developement';

var app = express();

app.set('port', port);

app.use('/app', express.static(path.resolve(__dirname, '../client/app')));
app.use('/libs', express.static(path.resolve(__dirname, '../client/libs')));

// for system.js to work. Can be removed if bundling.
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.static(path.resolve(__dirname, '../../node_modules')));

app.use(bodyParser.json());
//app.use('/api', new BaseRoutes().routes);
mongoose.connect(config.mongodb.uri);

require('./model/models')(app, mongoose);
require('./routes/user')(app);
var renderIndex = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
}

app.get('/*', renderIndex);


/* app.post("/home", upload.array("uploads[]", 12), function(req, res) {
    res.send(req.files);
}); */


if(env === 'developement'){
    app.use(function(err, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}


// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

export { app }
