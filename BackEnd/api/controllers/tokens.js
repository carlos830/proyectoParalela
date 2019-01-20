'use strict';
const jwt = require('../services/jwt');
const models = require('../models');
const Tokens = models.tokens;
const crypto = require('crypto');
const secret = 'utem2018';

function encriptar(text) {
    const hash = crypto.createHash('sha512');
    const data = hash.update(text, secret);
    const hashFin = data.digest('hex');
    return hashFin;
}

function authenticate(req, res) {
    const params = req.body;
    const rut = params.rut;
    const password = params.password;
    const hashOld = encriptar(password);
    Tokens.findOne({
        where: { rut: rut }
    })

    .then(token => {
            if (!token) {
                res.status(400).send({ message: "El usuario no existe" });
            } else {
                //Si el usuario existe comprobar la constraseña

                if (hashOld == token.password) {
                    //Si la constraseña es la misma, devuleve los datos del usuario logueado
                    if (params.gethash) {
                        //Si viene un hash devolvermos un token de jwt-simple
                        res.status(200).send({
                            token: jwt.createToken(token)
                        });
                    } else {
                        res.status(200).send({ token });
                    }
                } else {
                    res.status(404).send({ hashFin });
                }
            }
        })
        .catch(err => {
            res.status(500).send({ err });
        })
}


function forgot(req, res) {
    const params = req.body;
    const rut = params.rut;
    const email = params.email;

    Tokens.findOne({
        where: { rut: rut }
    })

    .then(token => {
        if (!token) {
            res.status(400).send({ message: "Usuario no existe" });
        } else {
            if (token.email == email) {
                res.status(200).send({ token })
            } else {
                res.status(404).send("Correo no coincide");
            }
        }
    })

    .catch(err => {
        res.status(500).send("Error interno");
    })

}

function chance(req, res) {
    const params = req.body;
    const rut = params.rut;
    const password = params.password;
    const newPassword = params.temporal
    const hashOld = encriptar(password);
    const hashNew = encriptar(newPassword);

    Tokens.findOne({
        where: { rut: rut }
    })

    .then(token => {
                if (!token) { //no existe usuario
                    res.status(400).send({ message: "El usuario no existe" });
                } else { //Si existe comprobar contraseña
                    if (token.password == hashOld) {
                        token.updateAttributes({
                            password: hashNew
                        })
                        res.status(200).send({ token });
                    } else {
                        res.status(404).send({ message: "El usuario no ha podido loguearse" });
                    }

                }
            }

        )
        .catch(err => {
            res.status(500).send({ err });
        })
}


module.exports = {
    authenticate,
    forgot,
    chance

}