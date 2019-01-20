'use strict';
module.exports = (sequelize, DataTypes) => {
    const Finished_courses = sequelize.define('finished_courses', {
        pk: {
            primaryKey: true,
            type: DataTypes.BIGINT,

        },
        rut: DataTypes.INTEGER,
        courses_fk: DataTypes.BIGINT,
        students_fk: DataTypes.BIGINT,
        grade: DataTypes.INTERGER,
        status: DataTypes.INTEGER

    });
    return Finished_courses;
}