'use strict'

var express = require('express');
var CarreraControler = require('../Controllers/carrera');
var md_auth = require('../Middlewares/authenticated');
var multiparty = require('connect-multiparty');
var api = express.Router();

api.get('/agregarCarrera',md_auth.ensureAut, CarreraControler.saveCarrera);
api.post('/listarCarrera',CarreraControler.listCarrera);
api.delete('/eliminarCarrera/:id', CarreraControler.deleteCarrera);
api.put('/updateCarrera/:id', md_auth.ensureAut,CarreraControler.updateCarrera);

module.exports = api;
