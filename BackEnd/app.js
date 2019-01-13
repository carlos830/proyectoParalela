const express=require('express');
const bodyParser=require('body-parser');
//const logger=require('morgan');
//const coockieParser=require('cookie-parser');
//const request = require('request');
const path=require('path');
//const favicon=require('serve-favicon');


const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Cabeceras
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request_Method');
    res.header('Access-Control-Allow-Methods', 'GET,´POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE')
    next();
});


//Rutas
require('./server/routes/students'); //revisar linea

app.get('*', (req,res) =>{
    res.status(200).send({message: "Bienvenido"});
})

module.exports =app;