

///=================================
// Puerto
///=================================

process.env.PORT = process.env.PORT || 3000;

///=================================
// Entorno
///=================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


///=================================
// Vencimiento del Token
///=================================
//60 segundo
//60 minutos
//24 horas
//30 dias

process.env.CADUCIDAD_TOKEN = '48hs';



///=================================
// Seed de auntentificacion
///=================================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'


///=================================
// Entorno
///=================================

let urlDB;

if(process.env.NODE_ENV === 'dev'){
   urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = process.env.MONGO_URL;
}


process.env.URLDB = urlDB;



///=================================
// Google Client ID
///=================================



process.env.CLIENT_ID = process.env.CLIENT_ID || "78226398466-a2m8vsvkumh8g7l9s9gtnkhnj09orru2.apps.googleusercontent.com"