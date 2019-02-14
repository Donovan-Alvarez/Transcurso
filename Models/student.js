'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = Schema({
    name: String,
    carrer: String,
    identity: String,
    teacher: {type: Schema.ObjectId, ref: 'Teacher'},
});

module.exports = mongoose.model('Student', StudentSchema);