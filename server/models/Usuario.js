const mongoose = require('mongoose');
//para validar el unique de email
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos={
    values:['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es necesario']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'El correo es necesario']
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria']
    },
    img:{
        type:String,
        required:false
    },
    role:{
        type:String,
        default:'USER_ROLE',
        enum:rolesValidos

    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});

//funcion para no imprimir la contraseña al hacer peticiones
usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject()
    delete userObject.password;
    return userObject;
}
//mensaje que se va a imprimir al no validar el unique de email
usuarioSchema.plugin(uniqueValidator,{message:'{PATH} debe de ser unico'})

//exportamos la collections
module.exports = mongoose.model('Usuario',usuarioSchema);