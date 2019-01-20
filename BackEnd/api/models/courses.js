'use strict';
module.exports = (sequelize, Datatypes) => {
    const Courses = sequelize.define('courses', {
        pk: {
            primaryKey: true,
            type: Datatypes.BIGINT,

        },
        code: DataTypes.BIGINT,
        ordinal: DataTypes.INTEGER,
        year: DataTypes.INTEGER,
        subjet_fk: DataTypes.BIGINT,
        teacher_fk: DataTypes.BIGINT,
        section: DataTypes.INTEGER
    })
    return Courses;
}