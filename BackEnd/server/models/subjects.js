'use strict';

module.exports = (sequelize, DataTypes) =>{
    const subjects=sequelize.define('academia.subjects',{
        pk:{
            primaryKey:true,
            autoIncrement: true,
            type:DataTypes.BIGINT
            
        },
        code:DataTypes.STRING,
        name:DataTypes.STRING,
        created: DataTypes.DATE

    });
    subjects.associate = function(models) {
        subjects.belongsTo(models.courses, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: true
          }
        })
      }
    return subjects;
}