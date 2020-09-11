const express = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();

app.get('/usuario',(req,res)=>{

    let desde = req.query.desde || 0;

    desde = Number(desde);

    let limite = req.query.limite || 5;

    limite = Number(limite);

    Usuario.find({estado:true},'nombre email role estado google img').skip(desde).limit(limite).exec((err,usuarios) =>{

        if(err){

            return res.status(400).json({

                ok:false,
                err

            })
        };
        Usuario.count({estado:true},(err,conteo)=>{
            res.json({
                ok:true,
                usuarios,
                cuantos:conteo
            });
        })

    })
    
})


app.post('/usuario',(req,res)=>{
    //variable donde guarda los datos emviados por el formulario
    let body = req.body
    //crea un object de Usuario con los datos del formulario
    let usuario = new Usuario({
        nombre:body.nombre,
        email:body.email,
        password:bcrypt.hashSync(body.password,10),
        role:body.role
    })
    //guarda en la base de datos
    usuario.save((err,usuarioDB)=>{

        

        res.json({
            ok:true,
            usuario:usuarioDB
        })

    })
})


app.put('/usuario/:id',(req,res)=>{

    let id = req.params.id;
    let body = _.pick(req.body,['nombre','email','img','role','estado']);

    Usuario.findByIdAndUpdate(id,body,{new:true, runValidators:true},(err,usuarioDB)=>{
        
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }        
        res.json({
            ok:true,
            usuario:usuarioDB
        });
    })
});
app.delete('/usuario/:id',function(req,res){
    
    let id = req.params.id;
    //Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{

    let cambiaEstado = {
        estado:false
    }
    Usuario.findByIdAndUpdate(id,cambiaEstado,{new:true},(err,usuarioBorrado)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }      
        if(!usuarioBorrado){
        
                return res.status(400).json({
                    ok:false,
                    err:{
                        message:'usuario no encontrado'
                    }
                });
            }      
        res.json({
            ok:true,
            usuario:usuarioBorrado
        })
    })

})


module.exports = app;