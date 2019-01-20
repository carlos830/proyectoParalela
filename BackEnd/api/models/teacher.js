'use strict'
module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('tokens', {
        pk: {
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        rut: DataTypes.INTEGER,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        gender: DataTypes.INTEGER,
        birthdate: DataTypes.DATE



    });
    return Teacher;
}