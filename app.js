'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Rutas
var admin_routes = require('./Routes/admin');
var teacher_routes = require('./Routes/teacher');
var student_routes = require('./Routes/student');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Rutas de bodyParser
app.get('/prueba',(req, res)=>{
    res.status(200).send({message: 'Probando el servidor'})
});

// rutas
 app.use('/v1',teacher_routes);
 app.use('/v2',student_routes);
app.use('/v', admin_routes);

// Cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

module.exports = app;