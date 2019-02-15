'use strict'

'use strict'

var Student = require('../Models/student');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../Services/jwt');
var multiparty = require('connect-multiparty');


function saveStudent(req,res){
    var student = new Student();
    var params = req.body;

    if(params.name && params.identity && params.career){
        student.name = params.name;
        student.surname = params.surname;
        student.career = params.career;
        student.identity = params.identity;
        student.teacher = null;
    
    student.save((err,studentSave)=>{
        if(err){
            res.status(500).send({message: 'No se ha guardado'});
        }else{
            if(!studentSave){
                res.status(500).send({message: 'Error al guardar los datos'});
            }else{
                res.status(200).send({student: studentSave});
            }
        }
    });
}else{
    res.status(404).send({message: 'Debe introducir los campos requeridos'});
}
}
// Eliminar
function deleteStudent(req,res){
    var id = req.params.id

    Student.findByIdAndDelete({_id: id}, (err, id)=>{
        if(err){
            res.status(500).send({message: 'Error al eliminar el profesor'});
        }else{
            res.status(200).send({message: 'Se ha eliminado exitosamente'});
        }
    })
}

// listar
function listStudent(req, res){
    Student.find({},(err,student)=>{
        if(err){
            res.status(500).send({message: 'Error al listar los profesores'});
        }else{
            res.status(200).send(student);
        }
    })
}
//actualizar
function updateStudent(req, res){
    var studentID = req.params.id;
    var update = req.body;

    if(studentID != req.student.sub){
        res.status(500).send({message: 'No tiene permiso para actualizar el profesor'});
    }

    Student.findByIdAndUpdate(studentID,update, {new:true}, (err, StudentUpdate) =>{
        if(err){
            res.status(500).send({message: 'Error al actualizar el profesor'});
        }else{
            if(!StudentUpdate){
                res.status(404).send({message:'No se ha podido actualizar el profesor'});
            }else{
                res.status(200).send({student: StudentUpdate});
            }
        }
    });
}

module.exports = {
    saveStudent,
    deleteStudent,
    listStudent,
    updateStudent
}