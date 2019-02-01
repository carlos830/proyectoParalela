'use strict';
const Sequelize = require('sequelize');
const { client } = require('pg');
const sequelize = new Sequelize('postgres://postgres:dragon830@localhost:5432/paralelas')
const models = require('../models');
const regression = require('regression');

//const Op = Sequelize.Op;
function Student(req, res) { //revisar
    const params = req.body;
    const rut = params.rut;
    const apiKey = params.apiKey;

    sequelize.query(`select a1.birthdate, a1.first_name as "firstName",(case when a1.gender =0 then 'FEMENINO' else 'MASCULINO' end) as gender, a1.last_name as "lastName", 
    a1.rut from students a1 inner join tokens a2 on a1.rut = a2.rut where a2.rut = ${rut} and a2.apiKey = '${apiKey}'`, { type: Sequelize.QueryTypes.SELECT })

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


    sequelize.query(`Select average,position, stddev,birthdate,"firstName",gender,"lastName",rut
    from (select rut, average, ROW_NUMBER () over (order by average desc) as position, "firstName",
          "lastName",gender,stddev,birthdate, apiKey
          from(select students.rut as rut, round(avg(grade),2) as average, students.first_name as "firstName",
               round(coalesce(stddev_samp(finished_courses.grade),0),3) as stddev, students.birthdate as birthdate,
               (case when students.gender=0 then 'FEMENINO' else 'MASCULINO' end )as gender, students.last_name as "lastName", tokens.apiKey as apiKey
               from finished_courses join courses 
               on finished_courses.course_fk = courses.pk 
               join students on finished_courses.student_fk = students.pk 
               join tokens on students.rut = tokens.rut
               
    group by  tokens.apiKey, students.rut, students.first_name,students.last_name, students.gender,students.birthdate) as foo) as foo2 
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

function regresion(req, res) {
    const params = req.body;
    var rut = req.params.rut;
    var apiKey = req.header('apiKey');
    //transforma rut para 
    rut = rut.replace(/\./g, '');
    rut = rut.replace(/\-/g, '');
    rut = rut.substring(0, rut.length - 1);

    sequelize.query(`select promedio, stddev, year, birthdate,firstName, lastName,
	gender , rut, apiKey from
    (select round(avg(a2.grade),2)  as promedio, round(coalesce(stddev_samp(a2.grade),0),3) as stddev, a3.year as year, a1.first_name as firstName, a1.last_name as lastName,
	 (case when a1.gender=0 then 'FEMENINO' else 'MASCULINO' end )as gender, a1.rut as rut, a1.birthdate as birthdate, a4.apiKey as apiKey
    from students as a1 inner join finished_courses as a2 on a1.pk = a2.student_fk inner join courses as a3 on a2.course_fk = a3.pk inner join tokens a4
	 on a4.rut = a1.rut
    where a1.rut=${rut}
    group by a3.year, a1.first_name, a1.last_name, a1.gender, a1.rut, a1.birthdate, a4.apiKey) as nota
    group by nota.promedio, nota.stddev, nota.firstName, nota.year, nota.birthdate, nota.rut, nota.lastName, nota.gender, nota.apiKey
    order by year desc
`, { type: Sequelize.QueryTypes.SELECT })

    .then(student => {
        if (student == '') {
            res.status(400).send({ message: "rut mal ingresado o usuario no existe" })
        } else {
            if (apiKey == student[0].apikey) {
                var query = []
                var jsonData = { data: [] }
                for (var i in student) {
                    var sub_query = []
                    sub_query.push(parseInt(student[i].year))
                    sub_query.push(parseFloat(student[i].promedio))
                    query.push(sub_query)
                    jsonData.data.push({
                        "year": parseInt(student[i].year),
                        "average": parseFloat(student[i].promedio),
                        "stddev": parseFloat(student[i].stddev)
                    })
                }

                const result = regression.linear(query);
                jsonData["m"] = result.equation[0];
                jsonData["n"] = result.equation[1];
                jsonData["r2"] = parseFloat(result.r2);
                jsonData["equation"] = result.string
                console.log(result);

                res.status(200).send(
                    jsonData
                    /*{
                        student: [{
                            birthdate: student[0].birthdate,
                            firstName: student[0].firstname,
                            gender: student[0].gender,
                            lastName: student[0].lastname,
                            rut: student[0].rut
                        }]
                    }*/
                );
            } else {
                res.status(404).send({ message: "Necesita volver a logearse" })
            }
        }

    })
}


module.exports = {
    ranking,
    Student,
    regresion
}