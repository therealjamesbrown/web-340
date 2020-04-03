/*
============================================
; Title:  brown-assignment.7.3.js
; Author: Professor Krasso
: Modifications by: James Brown
; Date:   4/3/2020
; Description: Chai example
;===========================================
*/

var fruits = require("../brown-fruits");
var chai = require("chai");

var assert = chai.assert;

describe("fruits", function(){
    it("should return an array of fruits", function(){
        var f = fruits('Apple,Orange,Mango');
        assert(Array.isArray(f));
    });
});