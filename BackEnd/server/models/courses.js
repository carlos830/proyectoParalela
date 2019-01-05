'use strict';

module.exports = (sequelize, DataTypes) =>{
    const courses=sequelize.define('academia.courses',{
        pk:{
            primaryKey:true,
            autoIncrement: true,
            type:DataTypes.BIGINT
            
        },
        code:DataTypes.BIGINT,
        ordinal:DataTypes.INTEGER,
        year: DataTypes.INTEGER,
        subject_fk: DataTypes.BIGINT,
        teacher_fk: DataTypes.BIGINT,
        section: DataTypes.INTEGER
    });
    courses.associate = function(models){
        courses.belongTo(models.finished_courses,{
            onDelete: "CASCADE",
            foreignKey:{
                allowNull: true
            }
        }),
        courses.hasMany(models.teachers);
        courses.hasMany(models.subjects);
    }
    return courses;
}