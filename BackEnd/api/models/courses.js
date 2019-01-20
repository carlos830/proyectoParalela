'use strict';
module.exports = (sequelize, DataTypes) => {
    const Courses = sequelize.define('courses', {
        pk: {
            primaryKey: true,
            type: DataTypes.BIGINT,

        },
        code: DataTypes.BIGINT,
        ordinal: DataTypes.INTEGER,
        year: DataTypes.INTEGER,
        subject_fk: DataTypes.BIGINT,
        teacher_fk: DataTypes.BIGINT,
        section: DataTypes.INTEGER
    })
    return Courses;
}