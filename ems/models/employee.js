/*
============================================
; Title:  brown-assignment.7.4.js
; Author: James Brown
; Date:   4/3/2020
; Description: 
;===========================================
*/

//requires
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//define the employees schema
var emsSchema = new Schema({
    firstName: String,
    lastName: String,
    title: String,
    salary: String,
    years: String,
    productImage: { type: String }   
});

//define the employee model
var Employee = mongoose.model("Employee", emsSchema);

//expose employee to calling files
module.exports = Employee;

