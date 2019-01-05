'use strict';

module.exports = (sequelize, DataTypes) =>{
    const tokens=sequelize.define('academia.tokens',{
        pk:{
            primaryKey:true,
            autoIncrement: true,
            type:DataTypes.BIGINT
            
        },
        rut:DataTypes.INTEGER,
        password:DataTypes.STRING,
        email: DataTypes.STRING,
        api_key: DataTypes.STRING,
        role: DataTypes.STRING


    });
    tokens.associate = function(models) {
        tokens.belongsTo(models.students, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: true
          }
        }),
    tokens.belongsTo(models.teachers,{
        onDelete: "CASCADE",
        foreignKey:{
            allowNull: true
        }
        })
      }

    return tokens;
}