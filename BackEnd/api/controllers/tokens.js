'use strict';


//const tokens = require('../models/').tokens
const models = require('../models');
const Tokens = models.tokens;
const http = require('http');


function authenticate(req, res) {
    const params = req.body;
    var rut = params.rut;

    Tokens.findOne({
        where: { rut: rut }
    })

    .then(token => {
        if (!token) { //no existe usuario
            res.status(400).send({ message: "El usuario no existe" });
        } else { //Si existe comprobar contraseña
            if (token.password == password) {
                res.status(200).send({ token });
            } else {
                res.status(404).send({ message: "El usuario no ha podido loguearse" })
            }

        }
    })

    .catch(err => { //si no encuentra el rut
        res.status(500).send({ params });
    })
}

/*function mostrar(req,res){
    const tokenId=req.body.id;
    const 
    
}
*/

module.exports = {
    authenticate
}