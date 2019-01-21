const express = require('express');
const CoursesController = require('../controllers/courses');

module.exports = (app) => {
        app.post('/api/v1/courses/subject/stats', CoursesController.estadistica);

    } //poniendo las cosas en orden