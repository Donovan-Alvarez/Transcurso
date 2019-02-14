'use strict'

var Teacher = require('../Models/teacher');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../Services/jwt');
var multiparty = require('connect-multiparty');

var fs=require('fs');
var path = require('path');

function prueba(req, res){
    res.status(200).send({message: 'Probando servidor de teachers'});
}

// Agregar
function saveTeacher(req,res){
    var teacher = new Teacher();
    var params = req.body;
    if(params.password && params.name && params.surname && params.email){
        teacher.name = params.name;
        teacher.surname = params.surname;
        teacher.email = params.email;
        teacher.role = 'ROLE_TEACHER';
        teacher.imagen = null;

        Teacher.findOne({email: teacher.email.toLowerCase()}, (err, issetteacher)=>{
            if(err){
                res.status(500).send({message: 'Error, el usuario no existe'});
            }else{
                if(!issetteacher){
                    bcrypt.hash(params.password,null,null,function(err, hash){
                        teacher.password = hash;

                        teacher.save((err, teacherStored)=>{
                            if(err){
                                res.status(500).send({message: 'Error al guardar usuario'});
                            }else{
                                if(!teacherStored){
                                    res.status(404).send({message: 'No se ha podido registrar el usuario'});
                                }else{
                                    res.status(200).send({teacher: teacherStored});
                                }
                            }
                        });
                    });
                }else{
                    res.status(200).send({message: 'El usuario no puede registrarse'});
                }
            }
        });
    }else{
        res.status(200).send({message: 'Introduce los datos correctamente'});
    }
}
// Eliminar
function deleteTeacher(req,res){
    var id = req.params.id

    Teacher.findByIdAndDelete({_id: id}, (err, id)=>{
        if(err){
            res.status(500).send({message: 'Error al eliminar el profesor'});
        }else{
            res.status(200).send({message: 'Se ha eliminado exitosamente'});
        }
    })
}

// Login
function loginTeacher(req,res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    Teacher.findOne({email: email.toLowerCase()},(err, teacher) => {
        if(err){
            res.status(500).send({message: 'Error al intentar iniciar sesión'});
        }else{
            if(teacher){
                bcrypt.compare(password, teacher.password, (err, check) => {
                    if(check){
                        if(params.gettoken){
                            res.status(200).send({
                             token: jwt.createToken(teacher) 
                            });
                        }else{
                        res.status(200).send({teacher});
                    }
                    }else{
                        res.status(404).send({message: 'El usuario no ha podido loguearse correctamente'});
                    }
                });
            }else{
                res.status(404).send({message: 'No se ha podido encontrar al usuario'});
            }
        }
    });
}

// listar
function listTeacher(req, res){
    Teacher.find({},(err,teacher)=>{
        if(err){
            res.status(500).send({message: 'Error al listar los profesores'});
        }else{
            res.status(200).send(teacher);
        }
    })
}
//actualizar
function updateTeacher(req, res){
    var teacherID = req.params.id;
    var update = req.body;

    if(teacherID != req.teacher.sub){
        res.status(500).send({message: 'No tiene permiso para actualizar el profesor'});
    }

    Teacher.findByIdAndUpdate(teacherID,update, {new:true}, (err, teacherUpdate) =>{
        if(err){
            res.status(500).send({message: 'Error al actualizar el profesor'});
        }else{
            if(!teacherUpdate){
                res.status(404).send({message:'No se ha podido actualizar el profesor'});
            }else{
                res.status(200).send({teacher: teacherUpdate});
            }
        }
    });
}
function uploadDoc(req,res){
    var teacherid = req.params.id;
    var file_name = 'Archivo no subido';

    if(req.files){
        var file_path = req.files.document.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_explit = file_name.split('\.');
        var file_ext = ext_explit[1];

        if(file_ext == 'txt' || file_ext == 'PDF' || file_ext =='docx'){
            if(teacherid != req.teacher.sub){
                res.status(500).send({message: 'No tiene permiso para modificar el usuario'});
            }
            Teacher.findByIdAndUpdate(teacherid, {document: file_name}, {new:true},(err, teacherUpdate)=>{
                if(err){
                    res.status(500).send({
                        message:'Error al actualizar el usuario'});
                }else{
                    if(!teacherUpdate){
                        res.status(404).send({
                            message:'No se ha podido actualizar el usuario'});
                    }else{
                        res.status(200).send({teacher: teacherUpdate, document: file_name});
                    }
                }
            });
        }else{
            fs.unlink(file_path,(err)=>{
            if(err){
                res.status(200).send({message:'Extensión no admitida, el archivo no se ha eliminado'});
            }else{
                res.status(200).send({message:'Extensión no admitida, archivo eliminado'});
            }    
        });    
    }
    }else{
        res.status(404).send({message: 'No se han subido archivos'});
    }
}
module.exports = {
    prueba,
    saveTeacher,
    listTeacher,
    deleteTeacher,
    loginTeacher,
    updateTeacher,
    uploadDoc
}