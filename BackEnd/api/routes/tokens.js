const express = require('express');
const TokenController = require('../controllers/tokens');

module.exports = (app) => {
    app.post('/api/v1/authentication/authenticate', TokenController.authenticate);
    app.post('/api/v1/authentication/forgot/:rut', TokenController.forgot);
    app.post('/api/v1/authentication/passsword/change', TokenController.chance);
    app.post('/api/v1/email/send', TokenController.mail);
    app.post('/api/v1/sms/send', TokenController.sms);
    app.get('/api/v1/heartbeat', TokenController.revisar);
}