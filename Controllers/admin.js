'use strict'


var Student = require('../Models/student');
var Teacher = require('../Models/teacher');
var Admin = require('../Models/admin')
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../Services/jwt');
var multiparty = require('connect-multiparty');
var path = require('path');
var fs=require('fs');
//TEACHER
function prueba(req, res){
    res.status(200).send({message: 'Probando servidor de teachers'});
}

// Agregar
function saveTeacher(req,res){
    var teacher = new Teacher();
    var params = req.body;
    //perame
    if(params.password && params.name && params.surname && params.email){
        teacher.name = params.name;
        teacher.surname = params.surname;
        teacher.email = params.email;
        teacher.role = 'ROLE_TEACHER';

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
// function loginTeacher(req,res){
//     var params = req.body;
//     var email = params.email;
//     var password = params.password;

//     Teacher.findOne({email: email.toLowerCase()},(err, teacher) => {
//         if(err){
//             res.status(500).send({message: 'Error al intentar iniciar sesión'});
//         }else{
//             if(teacher){
//                 bcrypt.compare(password, teacher.password, (err, check) => {
//                     if(check){
//                         if(params.gettoken){
//                             res.status(200).send({
//                              token: jwt.createToken(teacher) 
//                             });
//                         }else{
//                         res.status(200).send({teacher});
//                     }
//                     }else{
//                         res.status(404).send({message: 'El usuario no ha podido loguearse correctamente'});
//                     }
//                 });
//             }else{
//                 res.status(404).send({message: 'No se ha podido encontrar al usuario'});
//             }
//         }
//     });
// }

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
// subir Documento
function uploadDoc(req,res){
    var teacherId = req.params.id;
    var file_name = 'Archivo no subido';
   
  
    if(req.files){
      var file_path = req.files.document.path;
      var file_split = file_path.split('\\');
      var file_name = file_split[2];
  
      var ext_explit = file_name.split('\.')
      var file_ext = ext_explit[1];
  
      if(file_ext == 'pdf' || file_ext == 'txt'){
        if(teacherId != req.teacher.sub){
          res.status(500).send({
            message: 'No tiene permiso para modificar el usuario'
          });
        }
        Teacher.findByIdAndUpdate(teacherId, {document: file_name}, {new: true}, (err, teacherUpdate)=>{
          if(err){
            send.status(500).send({message: 'Error al actualizar el profesor'});
          }else{
            if(!teacherUpdate){
              res.status(404).send({message: 'NO se ha podido actualizar el usuario'});
            }else{
              res.status(200).send({teacher: teacherUpdate, document: file_name});
            }
          }
        });
      }else{
        res.status(200).send({message: 'Extensión no admitida'});
        fs.unlink(file_path, (err)=>{
          if(err){
          res.status(200).send({message: 'Extensión no es admitida y archivo no borrado'});
        }else{
          res.status(202).send({message: 'Extensión no admitida ...'});
        }
        });
      }
    }else{
      res.status(404).send({message: 'No se ha subido archivos'});
    }
  }
  //Repote
  
function Reporte (req,res){
    Teacher.find({},(err,reporteteacher)=>{
        Student.find({},(err, reporteStudent)=>{
        if(err){
            res.status(500).send({message: 'Denagado'});
        }else{
            res.status(202).send({student: reporteStudent, teacher: reporteteacher});
        }
    });
    });
}

  //STUDENT
  function saveStudent(req,res){
    var student = new Student();
    var params = req.body;

    if(params.name && params.identity && params.career){
        student.name = params.name;
        student.surname = params.surname;
        student.career = params.career;
        student.identity = params.identity;
        student.teacher = req.teacher.sub;
    
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
    Student.findOneAndUpdate(studentID,update, {new:true}, (err, StudentUpdate) =>{
        if(err){
            res.status(500).send({message: 'Error al actualizar el alumno'});
        }else{
            if(!StudentUpdate){
                res.status(404).send({message:'No se ha podido actualizar el alumno'});
            }else{
                res.status(200).send({student: StudentUpdate});
            }
        }
    });
}
function listarAlum (req,res){
    var params = req.teacher.sub;
    Student.find({teacher: params},(err,teachers)=>{
        if(err){
            res.status(500).send({message: 'Error al listar los alumnos'});
        }else{
            res.status(200).send(teachers);
        }
    })
}
// login
// function loginStuden(req,res){
//     var params = req.body;
//     var identity = params.identity;

//     Student.findOne({identity: identity.toLowerCase()},(err, student) => {
//         if(err){
//             res.status(500).send({message: 'Error al intentar iniciar sesión'});
//         }else{
//             if(student){
//                         if(params.gettoken){
//                             res.status(200).send({
//                              token: jwt.createToken(student) 
//                             });
//                         }else{
//                         res.status(200).send({student});
//                     }
//             }else{
//                 res.status(404).send({message: 'No se ha podido encontrar al usuario'});
//             }
//         }
//     });
// }
//ADMIN
//Guardar
function saveAdmin(req,res){
    var admin = new Admin();
    var params = req.body;
    if(params.password && params.name && params.surname && params.email){
        admin.name = params.name;
        admin.surname = params.surname;
        admin.email = params.email;
        admin.role = params.role;

        Admin.findOne({email: admin.email.toLowerCase()}, (err, issetadmin)=>{
            if(err){
                res.status(500).send({message: 'Error, el usuario no existe'});
            }else{
                if(!issetadmin){
                    bcrypt.hash(params.password,null,null,function(err, hash){
                        admin.password = hash;

                        admin.save((err, AdminStored)=>{
                            if(err){
                                res.status(500).send({message: 'Error al guardar usuario'});
                            }else{
                                if(!AdminStored){
                                    res.status(404).send({message: 'No se ha podido registrar el usuario'});
                                }else{
                                    res.status(200).send({admin: AdminStored});
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
//Eliminar
function deleteAdmin (req,res){
    var id = req.params.id

    Admin.findByIdAndDelete({_id: id},(err,id)=>{
        if(err){
            res.status(500).send({message: 'Error al eliminar'});

        }else{
            res.status(200).send({message: 'Se ha eliminado el admin'});
        }
    })
}
//Login
function loginAdmin(req,res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    Admin.findOne({email: email.toLowerCase()},(err, admin) => {
        if(err){
            res.status(500).send({message: 'Error al intentar iniciar sesión'});
        }else{
            if(admin){
                bcrypt.compare(password, admin.password, (err, check) => {
                    if(check){
                        if(params.gettoken){
                            res.status(200).send({
                             token: jwt.createToken(admin) 
                            });
                        }else{
                        res.status(200).send({admin});
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
//listar
function list(req,res){
    Admin.find({},(err,admin)=>{
        if(err){
            res.status(500).send({message: 'Error al listar los admins'});
        }else{
            res.status(200).send(admin);
        }
    })
}
//ACTIVITIES
'use strict'

var Actividad = require('../Models/activities');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../Services/jwt');

function saveActividad(req,res){
    var actividad = new Actividad();
    var params = req.body;
    if(params.title && params.description){
        actividad.title = params.title;
        actividad.description = params.description;
        actividad.teacher = req.body.teacher;
        actividad.save((err,actividadSave)=>{
        if(err){
            res.status(500).send({message: 'No se ha guardado'});
        }else{
            if(!actividadSave){
                res.status(500).send({message: 'Error al guardar los datos'});
            }else{
                res.status(200).send({actividad: actividadSave});
            }
        }
    });
}else{
    res.status(404).send({message: 'Debe introducir los campos requeridos'});
}
}
function deleteActividad(req,res){
    var id = req.params.id
    Actividad.findByIdAndDelete({_id: id}, (err, id)=>{
        if(err){
            res.status(500).send({message: 'Error al eliminar el profesor'});
        }else{
            res.status(200).send({message: 'Se ha eliminado exitosamente'});
        }
 })

}


function updateActividad(req, res){
    var ActividadID = req.params.id;
    var update = req.body;
    Actividad.findOneAndUpdate(ActividadID,update, {new:true}, (err, ActividadUpdate) =>{
        if(err){
            res.status(500).send({message: 'Error al actualizar el alumno'});
        }else{
            if(!ActividadUpdate){
                res.status(404).send({message:'No se ha podido actualizar el alumno'});
            }else{
                res.status(200).send({actividad: ActividadUpdate});
            }
        }
    });
}





module.exports = {
    //TEACHER
    saveTeacher,
    listTeacher,
    deleteTeacher,
    // loginTeacher,
    updateTeacher,
    uploadDoc,
    Reporte,
    //STUDENT
    saveStudent,
    deleteStudent,
    listStudent,
    updateStudent,
    listarAlum,
    // loginStuden,
    //ADMIN
    prueba,
    saveAdmin,
    deleteAdmin,
    list,
    loginAdmin,
    //ACTIVITIES
    saveActividad,
    deleteActividad,
    updateActividad
}