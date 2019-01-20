'use strict';
module.exports = (sequelize, DataTypes) => {
    const Subjects = sequelize.define('subjects', {
        pk: {
            primaryKey: true,
            type: DataTypes.BIGINT,

        },
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        created: DataTypes.DATE


    })
    return Subjects;
}