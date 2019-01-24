'use strict';
const nodemailer = require('nodemailer');
const Sequelize = require('sequelize');
const { client } = require('pg');
const sequelize = new Sequelize('postgres://postgres:dragon830@localhost:5432/paralelas')
const smtpTransport = require('nodemailer-smtp-transport');
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
                //Si el usuario existe comprobar la constrasenia

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
                    res.status(404).send({ message: "hola" });
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

function mail(req, res) {
    const params = req.body;
    const api_key = params.api_key;
    const email = params.email;
    const html = params.html;
    const message = params.message;
    const subject = params.subject;
    const token = params.token;
    const user = 'utemparalelas@gmail.com';
    const pass = 'utem2018';
    sequelize.query(`select  a1.email from tokens as a1 inner join students a2 on a1.rut = a2.rut
    inner join teachers as a3 on a1.rut= a3.rut
    where a1.api_key = '${api_key}'`, { type: Sequelize.QueryTypes.SELECT })



    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: user,
            pass: pass
        },
        tls: {
            rejectUnauthorized: false
        }
    }))

    const mailOptions = {
        from: user,
        to: `${email}`,
        subject: `${subject}`,
        text: `${message}`,
        html: html,
        token: token

    };
    transporter.sendMail(mailOptions, function(error, info) {



        if (error) {
            console.log(error);
            res.status(500).send(error.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(mailOptions);
        }
        transporter.close();
    });
};


module.exports = {
    authenticate,
    forgot,
    chance,
    mail

}