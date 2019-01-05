'use strict';

module.exports = (sequelize, DataTypes) =>{
    const teachers=sequelize.define('academia.teachers',{
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

    teachers.associate = function(models) {
        teachers.belongsTo(models.tokens, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: true
          }
        }),
        teachers.belongsTo(models.courses,{
            onDelete: "CASCADE",
            foreignKey: {
                allowNull:True   
            }
        })
      }
    return teachers;
}