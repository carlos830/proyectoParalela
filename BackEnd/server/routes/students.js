const studentsController=require('../controllers').students;

module.exports=(app)=>{
    app.post('/api/students', studentsController.create);
}