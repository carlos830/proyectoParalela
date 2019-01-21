'use strict';
const Sequelize = require('sequelize');
const { client } = require('pg');
const sequelize = new Sequelize('postgres://postgres:dragon830@localhost:5432/paralelas')
const models = require('../models');

//const Op = Sequelize.Op;

function course_rest_impl(req, res) {
    const params = req.body;
    const rut = params.rut;
    const api_key = params.api_key;

    sequelize.query(`select a1.api_key ,l.rut, l.first_name, s.name  from tokens as a1 inner join students as l on l.rut = a1.rut inner Join finished_courses as r on l.pk = r.student_fk inner join courses as d on r.course_fk = d.pk inner join subjects as s on s.pk= d.subject_fk where a1.api_key = '${api_key}' and l.rut = ${rut} order by l.rut`, { type: Sequelize.QueryTypes.SELECT })

    .then(token => {

            if (!token) {
                res.status(400).send({ message: "no existe estudiante" });
            } else {
                if (params.api_key = api_key) {
                    res.status(200).send(token);
                } else {
                    res.status(404).send({ message: "la contraseña es imcorrecta" })

                }
            }



        })
        .catch(err => {
            res.status(500).send(err);
        })
}


module.exports = {
    course_rest_impl
}