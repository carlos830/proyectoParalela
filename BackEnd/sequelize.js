const Sequelize = require('sequelize')

// Modelos
const TokenModel = require('./api/models/tokens')
const Finished_coursesModel = require('./api/models/finished_courses')

const sequelize = new Sequelize('postgres://postgres:dragon830@localhost:5432/paralelas')
const Tokens = TokenModel(sequelize, Sequelize)
const Finished_courses = Finished_coursesModel(sequelize, Sequelize)
    /*const CoursesModel = require('./api/models/courses')
    const Finished_coursesModel = require('./api/models/finished_courses')
    const StudentsModel = require('./api/models/students')
    const SubjectModel = require('./api/models/subjects')
    const TeachersModel = require('./api/models/teachers')*/

const sequelize = new Sequelize('postgres://postgres:dragon830@localhost:5432/paralelas')

//Sequelize
const Tokens = TokenModel(sequelize, Sequelize)
    /*const Courses = CoursesModel(sequelize, Sequelize)
    const Finished_courses = Finished_coursesModel(sequelize, Sequelize)
    const Students = StudentsModel(sequelize, Sequelize)
    const Subject = SubjectModel(sequelize, Sequelize)
    const Teachers = TeachersModel(sequelize, Sequelize)*/
sequelize.sync()
    .then(() => {
        console.log('Sincronizacion completa');
    })
    .catch(err => {
        console.log(err);
    })

module.exports = {
    Tokens
    /*,
        Courses,
        Finished_courses,
        Students,
        Subject,
        Teachers*/

}