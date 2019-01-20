'use strict';
module.exports = (sequelize, DataTypes) => {
    const Finished_courses = sequelize.define('finished_courses', {
        pk: {
            primaryKey: true,
            type: DataTypes.BIGINT,

        },
        course_fk: DataTypes.BIGINT,
        student_fk: DataTypes.BIGINT,
        grade: DataTypes.BIGINT,
        status: DataTypes.INTEGER
    })
    return Finished_courses;
}