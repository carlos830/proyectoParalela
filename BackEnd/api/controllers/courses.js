'use strict';
const Sequelize = require('sequelize');
const { client } = require('pg');
const sequelize = new Sequelize('postgres://postgres:dragon830@localhost:5432/paralelas')
const models = require('../models');
const Students = models.students;
const Token = models.tokens;
const Finished_Courses = models.finished_courses;
const Courses = models.courses;
const Subjects = models.subjects;
//const Op = Sequelize.Op;

function estadistica(req, res) {
    const params = req.body;
    const api_key = params.api_key;
    const ordinal = params.ordinal;
    const year = params.year;
    const subjectCode = params.subjectCode;


    sequelize.query(`select sum(status) as aprobado, count(a1.pk) as total, (count(a1.pk)-sum(status)) as reprobados,round(avg(grade),2) as promedio, round(coalesce(stddev_samp(grade),0),3) as desviacion , a2.code, a2.ordinal, a2.section, a3.code, a3.created, a3.name, a4.birthdate, a4.first_name, a4.last_name, a4.rut, a4.gender from finished_courses as a1 inner join courses as a2 on a2.pk = a1.course_fk inner join subjects as a3 on a2.subject_fk = a3.pk inner join teachers as a4 on a2.teacher_fk = a4.pk where a2.ordinal = ${ordinal} and a2.year = ${year} and a3.code = '${subjectCode}' group by a1.course_fk, a3.name, a2.ordinal, a2.section, a3.code, a3.created, a2.code, a4.birthdate, a4.first_name, a4.last_name, a4.rut, a4.gender order by a3.name`, { type: Sequelize.QueryTypes.SELECT })

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
    estadistica
}