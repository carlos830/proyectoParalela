'use strict';
const Sequelize = require('sequelize');
const { client } = require('pg');
const sequelize = new Sequelize('postgres://postgres:dragon830@localhost:5432/paralelas')
const models = require('../models');

//const Op = Sequelize.Op;
function Student(req, res) {
    const params = req.body;
    const rut = params.rut;
    const apiKey = params.apiKey;

    sequelize.query(`select a1.birthdate as birthdate, a1.first_name as firstName, a1.gender as gender, a1.last_name as lastName, a1.rut as rut from students a1
    inner join tokens a2 as on a1.rut = a2.rut
    where a1.rut =${rut} `, { type: Sequelize.QueryTypes.SELECT })

    .then(student => {

            if (student == '') {
                res.status(400).send({ message: "No existe estudiante" });
            } else {
                if (params.apiKey = apiKey) {
                    res.status(200).send(student);
                } else {
                    res.status(404).send({ message: "Necesita volver a logear " })

                }
            }



        })
        .catch(err => {
            res.status(500).send(err);
        })
}

function ranking(req, res) {
    const params = req.body;
    const rut = params.rut;
    const apiKey = params.apiKey;


    sequelize.query(`Select promedio,posicion, desviacion,birthdate,firstName,gender,lastName,rut
    from (select rut, promedio, ROW_NUMBER () over (order by promedio desc) as posicion, firstName,
          lastName,gender,desviacion,birthdate,apiKey
          from(select students.rut as rut, round(avg(grade),2) as promedio, students.first_name as firstName,
               round(coalesce(stddev_samp(finished_courses.grade),0),3) as desviacion, students.birthdate as birthdate,
               students.gender as gender, students.last_name as lastName, tokens.apiKey as apiKey
               from finished_courses join courses 
               on finished_courses.course_fk = courses.pk 
               join students on finished_courses.student_fk = students.pk 
               join tokens on students.rut = tokens.rut
    group by tokens.apiKey,students.rut, students.first_name,students.last_name, students.gender,students.birthdate) as foo) as foo2 
    where rut = ${rut} and apiKey = '${apiKey}'`, { type: Sequelize.QueryTypes.SELECT })

    .then(student => {

            if (student == '') {
                res.status(400).send({ message: "No existe ranking" });
            } else {
                if (params.apiKey = apiKey) {
                    res.status(200).send(student);
                } else {
                    res.status(404).send({ message: "Necesita volver a logear" })

                }
            }



        })
        .catch(err => {
            res.status(500).send(err);
        })
}


module.exports = {
    ranking,
    Student
}