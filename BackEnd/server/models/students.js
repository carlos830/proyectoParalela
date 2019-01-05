'use strict';

module.exports = (sequelize, DataTypes) =>{
    const students=sequelize.define('academia.students',{
        pk:{
            primaryKey:true,
            autoIncrement: true,
            type:DataTypes.BIGINT
            
        },
        rut:DataTypes.INTEGER,
        first_name:DataTypes.STRING,
        last_name: DataTypes.STRING,
        gender: DataTypes.INTEGER,
        birthdate: DataTypes.DATE,


    });
    
    students.associate = function(models) {
        students.belongsTo(models.tokens, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: true
          }
        }),
        students.belongsTo(models.finished_courses,{
            onDelete: "CASCADE",
            foreignKey:{
                allowNull: true
            }
        })
      }
    return students;
}