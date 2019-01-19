'use strict';
const models = require('../models');
const Tokens = models.tokens;

function authenticate(req, res) {
    const params = req.body;
    const rut = params.rut;
    const password = params.password;

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
            }

        )
        .catch(err => {
            console.log(err);
        })
}


module.exports = {
    authenticate
}