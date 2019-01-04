const students =require('../models').students;

function create(req,res){
    students.create(req.body)
    .then(student =>{
        res.status(200).send({student});
    })
    .catch(err=>{
        res.status(500).send({err});
    })
}


module.exports={
    create
}