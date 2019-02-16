'use strict'

var express = require('express');
var StudentController = require('../Controllers/students');
var md_auth = require('../Middlewares/authenticated');
var api = express.Router();
var multiparty = require('connect-multiparty');

api.get('/student-save',md_auth.ensureAut,StudentController.saveStudent);
api.delete('/delete/:id', StudentController.deleteStudent);
api.post('/list', StudentController.listStudent);
api.put('/update/:id',md_auth.ensureAut, StudentController.updateStudent);
api.post('/reporte',md_auth.ensureAut, StudentController.listarAlum);

module.exports = api;
