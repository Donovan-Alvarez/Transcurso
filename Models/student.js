'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = Schema({
    name: String,
    surname: String,
    career: String,
    identity: String,
    teacher: {type: Schema.ObjectId, ref: 'Teacher'},
});

module.exports = mongoose.model('Student', StudentSchema);