'use strict'

var Teacher = require('../Models/teacher');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../Services/jwt');

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



module.exports = {

    loginTeacher

}