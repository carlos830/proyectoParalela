const express = require('express');
const TokenController = require('../controllers/tokens');

module.exports = (app) => {
    app.post('/api/v1/authentication/authenticate', TokenController.authenticate);
}