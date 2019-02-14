'use strict'

var app = require('./app');
var mongoose = require('mongoose');
var port = process.env.port || 3689;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Transcurso', {useNewUrlParser: true})

.then((err,res)=>{
    console.log('Conexión a la base de datos realizada exitosamente');

    app.listen(port, ()=>{
        console.log('El servidor de Node y Express esta corriendo');
    })
})
.catch(err => console.log(err));