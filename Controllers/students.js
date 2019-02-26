
'use strict'

var Student = require('../Models/student');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../Services/jwt');
var multiparty = require('connect-multiparty');

// login
function loginStuden(req,res){
    var params = req.body;
    var identity = params.identity;

    Student.findOne({identity: identity.toLowerCase()},(err, student) => {
        if(err){
            res.status(500).send({message: 'Error al intentar iniciar sesión'});
        }else{
            if(student){
                        if(params.gettoken){
                            res.status(200).send({
                             token: jwt.createToken(student) 
                            });
                        }else{
                        res.status(200).send({student});
                    }
            }else{
                res.status(404).send({message: 'No se ha podido encontrar al usuario'});
            }
        }
    });
}

module.exports = {
    loginStuden
}