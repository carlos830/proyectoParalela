const Sequelize = require('sequelize')


const TokenModel = require('./api/models/tokens')
const sequelize = new Sequelize('postgres://postgres:dragon830@localhost:5432/paralelas')
const Tokens = TokenModel(sequelize, Sequelize)

sequelize.sync()
    .then(() => {
        console.log('Sincronizacion completa');
    })
    .catch(err => {
        console.log(err);
    })

module.exports = {
    Tokens
}