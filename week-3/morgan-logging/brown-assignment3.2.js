/*
============================================
; Title:  Exercise 3.2 - Logging
; Author: James Brown
; Date:   3/6/2020
; Description: coding per requirements of exercise 3.2
;===========================================
*/

var express = require("express");
var http = require("http");
var path = require("path");
var logger = require("morgan");

var app = express();

app.set("views", path.resolve(__dirname, "views"));

app.set("view engine", "ejs");

app.use(logger("short"));

app.get("/", function(request, response){
    response.render("index",{
        message: "This is James request logger!"
    });
});

http.createServer(app).listen(8080, function(){
    console.log("Application started on port 8080");
});