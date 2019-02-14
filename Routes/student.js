'use strict'

var express = require('express');
var studentController = require('../Controllers/students');
var md_auth = require('../Middlewares/authenticated');
var multiparty = require('connect-multiparty');

var md_upload = multiparty({uploadDir: './Uploads/students'});

var api = express.Router();

api.get('/prueba', studentController.prueba);