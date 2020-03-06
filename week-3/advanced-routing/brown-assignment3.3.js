/*
============================================
; Title:  Exercise 3.3 - Advanced Routing
; Author: James Brown
; Date:   3/6/2020
; Description: coding per requirements of exercise 3.3
;===========================================
*/

var express = require("express");
var http = require("http");
var path = require("path");
var logger = require("morgan");

var app = express();

app.set("views", path.resolve(__dirname, "views"));

app.set("view engine", "ejs");

app.use(logger("dev"));

app.get("/:employeeId", function(req,res){
    var employeeId = parseInt(req.params.employeeId, 10);

    res.render("index",{
        employeeId: employeeId
    });
});

http.createServer(app).listen(8080, function(){
    console.log("Application started on port 8080");
});

