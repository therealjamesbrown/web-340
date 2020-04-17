/*
============================================
; Title:  brown-assignment.8.4.js
; Author: James Brown
; Date:   4/12/2020
; Description: ems application
; Dislcaimer: All current employee images are royalty free images obtained via unsplash.com. 
;===========================================
*/

/**
 * 
 * REQUIRES AND IMPORTS
 * 
 */
var express = require('express');
var http = require('http');
var helmet = require('helmet');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var mongoose = require("mongoose");
var logger = require('morgan');
//using multer for uploading images to mongo
var multer = require('multer');
var Employee = require("./models/employee");



/**
 * 
 * LOGIC FOR STORING IMAGES
 * 
 */
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})
const upload = multer({storage: storage});



//setup csrf protection
var csrfProtection = csrf({cookie: true});

/**
 * 
 * MONGO DB CONNECTION
 * 
 */
var mongoDB = 'mongodb+srv://admin:snow1234@buwebdev-cluster-1-bbiz3.mongodb.net/test';
mongoose.connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connected error: "));

db.once("open", function(){
    console.log("App connected to mLab MongoDB instance");
});

/**
 * 
 * APP CONFIGURATION
 * 
 */
var app = express();

app.set('views', path.resolve(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use('/css', express.static('css'));

app.use(helmet.xssFilter());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use( express.static( "public" ) );

app.use(cookieParser());

app.use(csrfProtection);

app.use(function(req, res, next){
    var token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);
    res.locals.csrfToken = token;
    next();
})
app.use('/public', express.static('public'));



/**
 * 
 * BEGIN APP
 * 
 */

/**
 * LOAD THE INDEX OR HOME PAGE
 * 
 */
app.get('/', function (req, res){
    Employee.find({}, function (err, employees){
        if (err){
            console.log(err);
            throw err;
        } else {
            //console.log(employees);
            res.render('index', {
                title: "Employee Records Application",
                employees: employees
            });
        }
    });
});



/**
 *ADD NEW EMPLOYEE SECTION
 *section for new page to add user, get details, etc.
 */
app.get('/new', function(req, res) {
    Employee.find({}, function (err, employees){
        if (err){
            console.log(err);
            throw err;
        } else {
    res.render('new', {
      title: 'EMS | New',
      employees: employees
    });
}
});
});
//FILTER FOR POST REQUEST TO UPLOAD NEW DETAILS TO DB
app.post('/process', upload.single('img'), function(req, res){
    
    console.log(req.file);
    //console.log(`${req.body.txtFirstName} + ${req.body.txtLastName}`);
    if(!req.body.txtFirstName || !req.body.txtLastName){
        res.status(400).send("must fill out both fields");
        return;
    }

    //get the first and last name and add them to the existing object
    const newFirstName = req.body.txtFirstName;
    const newLastName = req.body.txtLastName;
    const newTitle = req.body.txtTitle;
    const newSalary = req.body.txtSalary;
    const years = req.body.txtYears;
    const newImg = req.file.path;


    //create new employee model
    var newEmployee = new Employee({
        firstName: newFirstName,
        lastName: newLastName,
        title: newTitle,
        salary: newSalary,
        years: years,
        img: newImg
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


/**
 * DELETE OPERATION
 * filters for post request to delete employee from the DB.
 */
app.post('/delete/:queryName', function(req, res){
    var queryName = req.params.queryName;
    console.log(queryName);
    Employee.deleteOne({'firstName': queryName}, function(err){
        if(err) console.log(err);
        console.log("Succcessful Deletion")
        res.redirect('/');
    });
});

/**
 * VIEW PAGE
 * This section takes a GET request, searches the mongo db for the name, retrieves the results and puts them back in the
 * UI.
 */
app.get('/view/:queryName', function(req, res){
    var queryName = req.params.queryName;
    Employee.find({'firstName': queryName}, function(error, employees){
        if (error) throw error;
        //console.log(employees);
        if(employees.length > 0){
            res.render("view", {
                title: "Employee Record",
                employee: employees
            });
        } else {
            console.log('employee not found');
            res.redirect("/");
        }
    })
})


//create and start server
http.createServer(app).listen(app.get('port'), function() {
    console.log('Application started on port ' + app.get('port'));
  });

/**
 * 
 * END PROGRAM
 * 
 */