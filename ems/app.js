/*
============================================
; Title:  brown-assignment.8.4.js
; Author: James Brown
; Date:   4/12/2020
; Description: ems application
;===========================================
*/

//requires
var express = require('express');
var http = require('http');
var helmet = require('helmet');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var mongoose = require("mongoose");
var logger = require('morgan');
var Employee = require("./models/employee");


//setup csrf protection
var csrfProtection = csrf({cookie: true});

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

//application setup
var app = express();

app.set('views', path.resolve(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use('/css', express.static('css'));

app.use(helmet.xssFilter());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.use(csrfProtection);

app.use(function(req, res, next){
    var token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);
    res.locals.csrfToken = token;
    next();
})



//handling of pages and forms
app.get('/', function (req, res){
    Employee.find({}, function (err, employees){
        if (err){
            console.log(err);
            throw err;
        } else {
            console.log(employees);
            res.render('index', {
                title: "Employee Records Application",
                employees: employees
            });
        }

    });
    
});


//section for new page to add user, get details, etc.

app.get('/new', function(req, res) {
    res.render('new', {
      title: 'EMS | New'
    });
  });

app.post('/process', function(req, res){
    console.log(`${req.body.txtFirstName} + ${req.body.txtLastName}`);
    if(!req.body.txtFirstName || !req.body.txtLastName){
        res.status(400).send("must fill out both fields");
        return;
    }
    //get the first and last name and add them to the existing object
    const newFirstName = req.body.txtFirstName;
    const newLastName = req.body.txtLastName;

    //create new employee model
    var newEmployee = new Employee({
        firstName: newFirstName,
        lastName: newLastName
    });
    // save
  newEmployee.save(function(err) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(newEmployee + ' saved successfully!');
      res.redirect('/');
    }
  });
});


//create and start server
http.createServer(app).listen(8080, function(){
    console.log(`app started on port 8080`);
});