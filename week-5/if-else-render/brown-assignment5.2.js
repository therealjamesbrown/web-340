/*
============================================
; Title:  Exercise 5.2
; Author: James Brown
; Date:   3/21/2020
; Description: Exercise 5.2
;===========================================
*/

// Require statement that imports the header.js file from my root directory.
const header = require('../../brown-header.js');

// Call the console.log() function and output a well-formatted header
console.log(header.display('James', 'Brown', 'Exercise 5.2'));

// Welcome message
console.log('\n--Welcome to Exercise 5.2--');

var express = require('express');
var http = require('http');
var path = require('path');

app = express();

app.set('views', path.resolve(__dirname,'views'));

app.set('view engine', 'ejs');

var f = [
    "Apple",
    "Blueberry",
    "Orange",
    "Strawberry"
];

app.get('/', function(req, res){
    res.render('index',{
        names: f
    })
});

http.createServer(app).listen(8080, function(){
    console.log("App started on port 8080!");
})

