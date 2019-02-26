'use strict'

var express = require('express');

var AdminController = require('../Controllers/admin');

var md_auth = require('../Middlewares/authenticated');
var multiparty = require('connect-multiparty');
var md_upload = multiparty({uploadDir: './Uploads/teachers'});
var api = express.Router();

//TEACHER
api.post('/save-teacher', AdminController.saveTeacher);
api.delete('/delete-teacher/:id',md_auth.ensureAut,AdminController.deleteTeacher);
api.get('/listar-teacher', AdminController.listTeacher);
api.post('/update-teacher/:id',md_auth.ensureAut, AdminController.updateTeacher);
api.post('/documento/:id',[md_auth.ensureAut,md_upload],AdminController.uploadDoc);
api.get('/reportes', AdminController.Reporte);
//STUDENT
api.get('/student-save',md_auth.ensureAut,AdminController.saveStudent);
api.delete('/delete/:id', AdminController.deleteStudent);
api.post('/list', AdminController.listStudent);
api.put('/update/:id',md_auth.ensureAut, AdminController.updateStudent);
api.post('/reporte',md_auth.ensureAut, AdminController.listarAlum);
//ADMIN
api.get('/prueba', AdminController.prueba);
api.get('/save-admin', AdminController.saveAdmin);
api.delete('/delete-admin/:id', AdminController.deleteAdmin);
api.post('/list-Admin', AdminController.list);
api.post('/login', AdminController.loginAdmin);
//ACTIVITIES
api.get('/save', AdminController.saveActividad);
api.delete('/delete/:id', AdminController.deleteActividad);
api.put('/update/:id', AdminController.updateActividad);



module.exports = api;