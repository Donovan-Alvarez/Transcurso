'use strict'

var express = require('express');
var TeacherController = require('../Controllers/teacher');



var api = express.Router();

api.post('/login-teacher',TeacherController.loginTeacher);



module.exports = api;