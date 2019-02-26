'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = Schema({
    name: String,
    surname: String,
    email: String,
    role: String,
    password: String
});

module.exports = mongoose.model('Admin', AdminSchema);