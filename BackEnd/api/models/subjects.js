'use strict';
module.exports = (sequelize, DataTypes) => {
    const subjects = sequelize.define('subjects', {
        pk: {
            primaryKey: true,
            type: DataTypes.BIGINT,

        },
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        created: DataTypes.DATE,
    })
    return subjects;
}