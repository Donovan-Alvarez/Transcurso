'use strict'

var Carrera = require('../Models/carrera');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../Services/jwt');
var multiparty = require('connect-multiparty');

function saveCarrera(req,res){
    var carrera = new Carrera();
    var params = req.body;

    if(params.career && params.description){
        carrera.career = params.career;
        carrera.description = params.description;
    carrera.save((err,carreraSave)=>{
        if(err){
            res.status(500).send({message: 'No se ha guardado'});
        }else{
            if(!carreraSave){
                res.status(500).send({message: 'Error al guardar los datos'});
            }else{
                res.status(200).send({carrera: carreraSave});
            }
        }
    });
}else{
    res.status(404).send({message: 'Debe introducir los campos requeridos'});
}
}
// eliminar
function deleteCarrera(req,res){
    var id = req.params.id

    Carrera.findByIdAndDelete({_id: id}, (err, id)=>{
        if(err){
            res.status(500).send({message: 'Error al eliminar la carrera'});
        }else{
            res.status(200).send({message: 'Se ha eliminado exitosamente'});
        }
    })
}
// listar
function listCarrera(req, res){
    Carrera.find({},(err,carrera)=>{
        if(err){
            res.status(500).send({message: 'Error al listar las carreras'});
        }else{
            res.status(200).send(carrera);
        }
    })
}
// actualizar
function updateCarrera(req, res){
    var CarrerID = req.params.id;
    var update = req.body;
    Carrera.findOneAndUpdate(CarrerID,update, {new:true}, (err, CarrerUpdate) =>{
        if(err){
            res.status(500).send({message: 'Error al actualizar la carrera'});
        }else{
            if(!CarrerUpdate){
                res.status(404).send({message:'No se ha podido actualizar la carrera'});
            }else{
                res.status(200).send({carrera: CarrerUpdate});
            }
        }
    });
}

module.exports = {
    saveCarrera,
    deleteCarrera,
    listCarrera,
    updateCarrera

}