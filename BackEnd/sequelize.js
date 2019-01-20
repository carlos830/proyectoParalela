const Sequelize = require('sequelize')

// Modelos
const TokenModel = require('./api/models/tokens')
const Finished_coursesModel = require('./api/models/finished_courses')
const CoursesModel = require('./api/models/courses')
const StudentsModel = require('./api/models/students')
const TeachersModel = require('./api/models/teachers')
const SubjectModel = require('./api/models/subjects')


const sequelize = new Sequelize('postgres://postgres:dragon830@localhost:5432/paralelas')

//Sequelize
const Tokens = TokenModel(sequelize, Sequelize);
const Courses = CoursesModel(sequelize, Sequelize)
const Students = StudentsModel(sequelize, Sequelize)
const Finished_courses = Finished_coursesModel(sequelize, Sequelize)
const Teachers = TeachersModel(sequelize, Sequelize)
const Subject = SubjectModel(sequelize, Sequelize)

//relaciones

Teachers.hasMany(Courses);
Courses.belongTo(Teachers);

sequelize.sync()
    .then(() => {
        console.log('Sincronizacion completa');
    })
    .catch(err => {
        console.log(err);
    })

module.exports = {
    Tokens,
    Courses,
    Students,
    Subject,
    Finished_courses,
    Teachers


}