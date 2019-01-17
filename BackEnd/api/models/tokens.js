module.exports = (sequelize, DataTypes) => {
    const tokens = sequelize.define('tokens', {
        pk: DataTypes.BIGINT,
        rut: DataTypes.INTEGER,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        api_key: DataTypes.STRING,
        role: DataTypes.STRING
    });
    return tokens;
}