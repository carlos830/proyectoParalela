'use strict';

module.exports = (sequelize, DataTypes) =>{
    const finished_courses =sequelize.define('academia.finished_courses',{
        pk:{
            primaryKey:true,
            autoIncrement: true,
            type:DataTypes.BIGINT
            
        },
        courses_fk:DataTypes.BIGINT,
        student_fk:DataTypes.BIGINT,
        grade: DataTypes.NUMERIC,
        status: DataTypes.INTEGER
        


    });
    finished_courses.associate = function(models){
        finished_courses.hasMany(models.courses);
        finished_courses.hasMany(models.student);
    }

    return finished_courses;
}