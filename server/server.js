require('./config/config')

const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path = require('path')
const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//habilitar la carpeta public
app.use(express.static(path.resolve(__dirname,'../public')))   


//configuracion global de rutas
app.use(require('./routes'));


mongoose.connect(process.env.URLDB,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true
},
(err,res)=>{
    if(err) throw err;

    console.log('Base de datos Online')
});


app.listen(process.env.PORT,()=>{
    console.log('escuchando el puerto ',process.env.PORT);
})