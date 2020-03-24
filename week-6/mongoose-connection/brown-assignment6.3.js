//require statements
var express = require('express');
var http = require('http');
var logger = require('morgan');
var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://admin:snow123@buwebdev-cluster-1-bbiz3.mongodb.net/test';
mongoose.connect(mongoDB, {
    userMongoClient: true
});

mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connected error: "));

db.once("open", function(){
    console.log("App connected to mLab MongoDB instance");
});

var app = express();
app.use(logger('dev'));

http.createServer(app).listen(5000, function(){
    console.log('app started on and is listening on port 5000');
});