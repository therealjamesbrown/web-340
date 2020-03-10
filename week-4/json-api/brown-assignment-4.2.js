/*
============================================
; Title:  Exercise 4.2
; Author: James Brown
; Date:   Enter Date
; Description: assignment 4.2 per instructions
;===========================================
*/

// Require statement that imports the header.js file from my root directory.
const header = require('../../brown-header.js');

// Call the console.log() function and output a well-formatted header
console.log(header.display('James', 'Brown', 'Exercise 4.2'));

// Welcome message
console.log('\n--Welcome to Exercise 4.2--');

var express = require("express");
var http = require("http");

var app = express();

app.get("/team/:id", function (request,response){

    var id = parseInt(request.params.id, 10);

    response.json({
        memberCount : "10",
        teamName: "Bellevue Team",
        teamId: id
    });
});

http.createServer(app).listen(8080, function(){
    console.log(`App started on port 8080`);
});


