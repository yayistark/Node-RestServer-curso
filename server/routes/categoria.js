const express = require('express')

let { verificarToken,verificaAdmin_Role} = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/Categoria')


//Mostrar todas las categorias
app.get('/categoria',verificarToken,(req,res)=>{
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario','nombre email')
        .exec((err,categorias)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                })
            }
            res.json({
                ok:true,
                categorias
            })
        })
});

//Mostrar una categoria por ID
app.get('/categoria/:id',verificarToken,(req,res)=>{

    let id = req.params.id;

    Categoria.findById(id,(err,categoriaDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'El ID no es correcto'
                }
            })
        }
        res.json({
            ok:true,
            categoriaDB
        })

    })

});

//Crear una nueva categoria
app.post('/categoria',verificarToken,(req,res)=>{
    //regresa la nueva categoria
    //req.usuario._id
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario:req.usuario._id
    });
    categoria.save((err,categoriaDB)=>{
        
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            categoria:categoriaDB
        })
    })

});

//Modificar una categoria
app.put('/categoria/:id',(req,res)=>{
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id,descCategoria,{new:true, runValidators:true},(err,categoriaDB) => {
                
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            categoria:categoriaDB
        })
    })

});

//Borrar una categoria
app.delete('/categoria/:id',(req,res)=>{
    //solo un administrador puede borrar categorias
    let id = req.params.id
    Categoria.findByIdAndRemove( id,[verificarToken,verificaAdmin_Role],(err,categoriaDB)=>{
                
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err :{
                    message:'el ID no existe'
                }
            })
        }
        res.json({
            ok:true,
            message:'Categoria Borrada'
        })
    })
});


module.exports = app;