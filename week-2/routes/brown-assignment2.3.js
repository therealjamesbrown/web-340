/*
============================================
; Title:  Assignment 2.3.js
; Author: James Brown
; Date:   2/27/2020
; Description: Assignment 2.3.js. 
;===========================================
*/

var express = require("express");
var http = require("http");
var app = express();

app.get("/", function(request, response){
    response.end("Welcome to the homepage!");
});

app.get("/about", function(request, response){
    response.end("Welcome to the about page!");
});

app.get("/contact", function(request, response){
    response.end("Welcome to the contact page!");
});

app.use(function(request, response){
    response.statusCode = 404;
    response.end("404");
});

http.createServer(app).listen(8080);