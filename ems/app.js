/*
============================================
; Title:  brown-assignment.7.4.js
; Author: James Brown
; Date:   4/3/2020
; Description: ems applicationf
;===========================================
*/

//requires
var express = require('express');
var http = require('http');
var helmet = require('helmet');
var path = require('path');
var mongoose = require("mongoose");
var logger = require('morgan');
var Employee = require("./models/employee");


//DB connection
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

//creating some test employees for the time being
var enterpriseEmployees = [
    new Employee({
        firstName: "James",
        lastName: "Brown"
    }),
    new Employee({
        firstName: "Shyan",
        lastName: "Allen"
    }),
    new Employee({
        firstName: "Fred",
        lastName: "Empkey"
    })
]


//application
var app = express();

app.set('views', path.resolve(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use('/css', express.static('css'));

app.use(helmet.xssFilter());

app.get('/', function (req, res){
    res.render('index', {
        title: "Employee Records Application",
        employees: enterpriseEmployees
    });
});

http.createServer(app).listen(8080, function(){
    console.log(`app started on port 8080`);
});