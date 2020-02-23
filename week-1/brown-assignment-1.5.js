/*
============================================
; Title:  Exercise 1.5
; Author: Professor Krasso
; Modifications by: James Brown
; Date:   2/23/2020
; Description: Exercise 1.5 per instructions
;===========================================
*/

// Require statement that imports the header.js file from my root directory.
const header = require('../brown-header.js');

// Call the console.log() function and output a well-formatted header
console.log(header.display('James', 'Brown', 'Exercise 1.5'));

var http = require("http");

function processRequest(req, res) {

var body = "The server is running!";

    var contentLength = body.length;

    res.writeHead(200, {

        'Content-Length': contentLength,

        'Content-Type': 'text/plain'

    });

    res.end(body);

}

var s = http.createServer(processRequest);

s.listen(8080);