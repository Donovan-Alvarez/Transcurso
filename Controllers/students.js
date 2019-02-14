'use strict'

var Student = require('../Models/student');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../Services/jwt');
var multipary = require('connect-multiparty');

var fs = require('fs');
var path = require('path');

function prueba(req,res){
    res.status(200).send({message: 'Probando Students'});
}

module.exports = {
    prueba
}