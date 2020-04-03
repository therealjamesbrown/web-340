/*
============================================
; Title:  brown-assignment.7.2.js
; Author: Professor Krasso
: Modifications by: James Brown
; Date:   4/3/2020
; Description: TDD example
;===========================================
*/

var assert = require('assert');

describe("String#split", function(){
    it("should return an array of fruits", function(){
        assert(Array.isArray('Apple,Orange,Mango'.split(',')));
    });
});

function getFruits(str){
    return str.split(',');
}

module.exports = getFruits;
