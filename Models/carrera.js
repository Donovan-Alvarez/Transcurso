'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;
var ObjectID = Schema.Types.ObjectId;

var CarreraSchema = Schema({
    career: String,
    description: String
});

module.exports = moongose.model('Carrera', CarreraSchema);