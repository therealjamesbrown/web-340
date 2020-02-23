/*
============================================
; Title:  Assignment 1.3
; Author: James Brown
; Date:   2/23/2020
; Description: assignment 1.3 per instructions
;===========================================
*/

// Require statement that imports the header.js file from my root directory.
const header = require('../brown-header.js');

// Call the console.log() function and output a well-formatted header
console.log(header.display('James', 'Brown', 'Assignment 1.3'));

// Welcome message
console.log('\n--Welcome to Exercise --');

var url = require("url");
var parsedURL = url.parse("https://www.github.com/test?color=red");

console.log(parsedURL.protocol);
console.log(parsedURL.host);
console.log(parsedURL.query);

``