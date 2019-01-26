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

function estadistica(req, res) {
    const params = req.body;
    const apiKey = params.apiKey;
    const ordinal = params.ordinal;
    const year = params.year;
    const subjectCode = params.subjectCode;


    sequelize.query(`select sum(status) as aproved,round(avg(grade),2) as average,a2.code as code_course,a2.ordinal as ordinal,
    a2.section as section,a3.code as code_subject, a3.created as created,a3.name as name,a4.birthdate as birthdate_teacher, a4.first_name as firstName_teacher,
    a4.gender as gender_teacher, a4.last_name as lastName_teacher, a4.rut as rut_teacher, a2.year as year, (count(a1.pk)-sum(status)) as reproved,
    round(coalesce(stddev_samp(grade),0),3) as stddev , count(a1.pk) as total
    from finished_courses as a1 inner join courses as a2 on a2.pk = a1.course_fk inner join subjects as a3 on a2.subject_fk = a3.pk
       inner join teachers as a4 on a2.teacher_fk = a4.pk where a2.ordinal = ${ordinal} and a2.year = ${year} and a3.code = '${subjectCode}' 
       group by a1.course_fk, a3.name, a2.ordinal, a2.section, a3.code, a3.created, a2.code, a4.birthdate, a4.first_name, a4.last_name, a4.rut, a4.gender, a2.year order by a3.name`, { type: Sequelize.QueryTypes.SELECT })

    .then(estado => {

            if (estado == '') {
                res.status(400).send({ message: "No existe estadistica" });
            } else {
                if (params.apiKey = apiKey) {
                    res.status(200).send(estado);
                } else {
                    res.status(404).send({ message: "Necesita volver a logear incorrecta" })

                }
            }



        })
        .catch(err => {
            res.status(500).send(err);
        })
}

function estadistica_student(req, res) {
    const params = req.body;
    const rut = params.rut;
    const apiKey = params.apiKey;

    sequelize.query(`select a3.code as code, a3.ordinal as ordinal, a3.year as year, a4.code as code_subject, a4.name as name, a4.created as created, a3.section as section,
     a5.rut as rut_teacher, a5.first_name as firsName_teacher, a5.last_name as lastName_teacher, a5.gender as gender_teacher, a5.birthdate as birthdate_teacher, a3.section as section,
     a1.rut as rut_student, a1.first_name as firstName_student, a1.last_name as lastName_student, a1.gender as gender_student, a1.birthdate as birthdate_student, a2.grade as grade,
     a2.status as status
    from students as a1 inner join finished_courses as a2 
    on a1.pk = a2.student_fk inner join courses as a3 on a2.course_fk = a3.pk inner join subjects as a4 on a3.subject_fk = a4.pk
    inner join teachers as a5 on a3.teacher_fk = a5.pk inner join tokens as a6 on a1.rut = a6.rut
    where  a6.rut = ${rut}
    `, { type: Sequelize.QueryTypes.SELECT })

    .then(estado_student => {

            if (estado_student == '') {
                res.status(400).send({ message: "Estudiante no ha cursado cursos o no existe" });
            } else {
                if (params.apiKey = apiKey) {
                    res.status(200).send(estado_student);
                } else {
                    res.status(404).send({ message: "Necesita volver a logearse" })

                }
            }



        })
        .catch(err => {
            res.status(500).send(err);
        })
}

function estadistica_teachers(req, res) {
    const params = req.body;
    const rut = params.rut;
    const apiKey = params.apiKey;

    sequelize.query(`select sum(status) as aprobado,round(avg(grade),2) as promedio,a2.code as code_course, a2.ordinal as ordinal,  a2.section as section,
    a3.code as code_subject , a3.created as created, a3.name as name,a4.birthdate as birthdate_teacher,
    a4.first_name as firstName_teacher,a4.gender as gender_teacher, a4.last_name as lastName_teacher,
    a4.rut as rut_teacher, a2.year as year,(count(a1.pk)-sum(status)) as reprobados, round(coalesce(stddev_samp(grade),0),3) as desviacion ,count(a1.pk) as total
     from finished_courses as a1 inner join courses as a2 on a2.pk = a1.course_fk inner join subjects as a3 on a2.subject_fk = a3.pk
     inner join teachers as a4 on a2.teacher_fk = a4.pk inner join tokens as a5 on a4.rut=a5.rut 
    where a4.rut = ${rut} 
    group by a1.course_fk, a3.name, a2.ordinal, a2.section, a3.code, a3.created, a2.code, a4.birthdate, a4.first_name, a4.last_name, a4.rut, a4.gender, a2.year order by a3.name`, { type: Sequelize.QueryTypes.SELECT })
        .then(estado_teacher => {

            if (estado_teacher == '') {
                res.status(400).send({ message: "Profesor no ha impartido cursos o no existe" });
            } else {
                if (params.apiKey = apiKey) {
                    res.status(200).send(estado_teacher);
                } else {
                    res.status(404).send({ message: "Necesita volver a logearse" })

                }
            }



        })
        .catch(err => {
            res.status(500).send(err);
        })
}



module.exports = {
    estadistica,
    estadistica_student,
    estadistica_teachers
}