/*
============================================
; Title:  Assignment 4.3.js
; Author: James Brown
; Date:   Enter Date
; Description: demonstrating the understanding of http status codes
;===========================================
*/

// Require statement that imports the header.js file from my root directory.
const header = require('../../brown-header.js');

// Call the console.log() function and output a well-formatted header
console.log(header.display('James', 'Brown', 'Assignment 4.3.js'));

// Welcome message
console.log('\n--Welcome to Assignment 4.3.js --');

var express = require("express");
var http = require("http");

var app = express();

app.get("/not-found", function(request,response){
    response.status(404);
    response.json({
        error: "Page not found"
    });
});

app.get("/ok", function(request,response){
    response.status(200);
    response.json({
        message: "Everything is working! 200 is what you want, most of the time."
    });
});

app.get("/not-implemented", function(request,response){
    response.status(501);
    response.json({
        error: "We've got a server error, please report this error to us."
    });
});

http.createServer(app).listen(8080, function(){
    console.log("Application started on port 8080.");
});