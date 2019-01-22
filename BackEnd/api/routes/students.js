const express = require('express');
const StudentsController = require('../controllers/students');
//const rut = require()
module.exports = (app) => {
    app.get(`/api/v1/students`, StudentsController.Student);
    app.get(`/api/v1/rankings`, StudentsController.ranking);



}