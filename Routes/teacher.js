'use strict'

var express = require('express');
var TeacherController = require('../Controllers/teacher');
var md_auth = require('../Middlewares/authenticated');


var multiparty = require('connect-multiparty');
var md_upload = multiparty({uploadDir: './Uploads/teachers'});

var api = express.Router();

api.get('/prueba-teacher', TeacherController.prueba);
api.post('/save-teacher', TeacherController.saveTeacher);
api.delete('/delete-teacher/:id',md_auth.ensureAut,TeacherController.deleteTeacher);
api.get('/listar-teacher', TeacherController.listTeacher);
api.post('/login-teacher',TeacherController.loginTeacher);
api.post('/update-teacher/:id',md_auth.ensureAut, TeacherController.updateTeacher);
api.post('/documento/:id',[md_auth.ensureAut,md_upload],TeacherController.uploadDoc);



module.exports = api;