const express = require('express');
const StudentsController = require('../controllers/students');

module.exports = (app) => {
    app.get('/api/v1/courses/students', StudentsController.course_rest_impl);

}