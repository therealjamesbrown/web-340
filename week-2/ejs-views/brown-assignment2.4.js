/*
============================================
; Title:  Assignment 2.2.js
; Author: James Brown
; Date:   2/27/2020
; Description: Assignment 2.2.js. starting a node server and echoing hello world at port 8080.
;===========================================
*/

var http = require("http");

var express = require("express");

var path = require("path");

var app = express();

app.set("views", path.resolve(__dirname, "views"));

app.set("view engine","ejs");

app.get("/",function(request, response){
    response.render("index",{
        firstName: "James",
        lastName: "Brown",
        address: "jamesbbb1@gmail.com"
    });
});

http.createServer(app).listen(8080, function(){
    console.log("EJS-Views app started on port 8080.");
});
