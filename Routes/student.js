'use strict'

var express = require('express');
var StudentController = require('../Controllers/students');
var md_auth = require('../Middlewares/authenticated');
var api = express.Router();
var multiparty = require('connect-multiparty');

api.post('/student-save',StudentController.saveStudent);
api.delete('/delete/:id', StudentController.deleteStudent);
api.post('/list', StudentController.listStudent);

module.exports = api;
