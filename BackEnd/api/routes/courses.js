const express = require('express');
const CoursesController = require('../controllers/courses');

module.exports = (app) => {
        app.post('/api/v1/courses/subject/stats', CoursesController.estadistica);
        app.get('/api/v1/courses/students', CoursesController.estadistica_student);
        app.get('/api/v1/courses/teachers/stats', CoursesController.estadistica_teachers);
    } //poniendo las cosas en orden