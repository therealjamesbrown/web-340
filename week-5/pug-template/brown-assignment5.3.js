/*
============================================
; Title:  Exercise 5.3
; Author: James Brown
; Date:   3/21/2020
; Description: Exercise 5.3
;===========================================
*/

// Require statement that imports the header.js file from my root directory.
const header = require('../../brown-header.js');

// Call the console.log() function and output a well-formatted header
console.log(header.display('James', 'Brown', 'Exercise 5.3'));

// Welcome message
console.log('\n--Welcome to Exercise 5.3--');

var express = require('express');
var http = require('http');
var pug = require('pug')
var path = require('path');

app = express();

app.set('views', path.resolve(__dirname,'views'));

app.set('view engine', 'pug');


app.get('/', function(req, res){
    res.render('index',{
        message: "Welcome to my Pug based homepage!"
    });
});

http.createServer(app).listen(8080, function(){
    console.log("App started on port 8080!");
})

