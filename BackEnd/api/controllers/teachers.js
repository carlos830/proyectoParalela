'use strict';
const Sequelize = require('sequelize');
const { client } = require('pg');
const sequelize = new Sequelize('postgres://postgres:dragon830@localhost:5432/paralelas')
const models = require('../models');

function teachers(req, res) {
    const params = req.body;
    const apiKey = params.apiKey;
    const rut = params.rut;
    sequelize.query(`select a1.birthdate, a1.first_name as "firstName", a1.gender, a1.last_name as "lastName", 
    a1.rut from teachers a1 inner join tokens a2 on a1.rut = a2.rut where a2.rut = ${rut}`, { type: Sequelize.QueryTypes.SELECT })

    .then(teacher => {

            if (teacher == '') {
                res.status(400).send({ message: "No existe docente" });
            } else {
                if (params.apiKey = apiKey) {
                    res.status(200).send(teacher);
                } else {
                    res.status(404).send({ message: "Necesita volver a logear incorrecta" })

                }
            }



        })
        .catch(err => {
            res.status(500).send(err);
        })
}

module.exports = {
    teachers
}