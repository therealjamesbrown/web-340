/*
============================================
; Title:  Assignment 2.2.js
; Author: James Brown
; Date:   2/27/2020
; Description: Assignment 2.2.js. starting a node server and echoing hello world at port 8080.
;===========================================
*/

var express = require("express");
var http = require("http");
var app = express();

app.use(function(request, response){
    console.log("in comes a request to: " + request.url);
    response.end("Hello World!");
});

http.createServer(app).listen(8080);