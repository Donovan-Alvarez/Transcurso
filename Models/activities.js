'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActividadSchema = Schema({
    title: String,
    description: String,
    teacher: {type: Schema.ObjectId, ref: 'Teacher'},
});

module.exports = mongoose.model('Actividad', ActividadSchema);