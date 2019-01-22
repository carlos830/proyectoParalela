const express = require('express');
const TeachersController = require('../controllers/teachers');

module.exports = (app) => {
    app.get('/api/v1/teachers', TeachersController.teachers);

}