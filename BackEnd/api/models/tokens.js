'use strict';
module.exports = (sequelize, DataTypes) => {
    const Tokens = sequelize.define('tokens', {
        pk: {
            primaryKey: true,
            type: DataTypes.BIGINT,

        },
        rut: DataTypes.INTEGER,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        api_key: DataTypes.STRING,
        role: DataTypes.STRING
    })
    return Tokens;
}