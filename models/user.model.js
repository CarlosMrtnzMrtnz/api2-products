const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true,
        default: " "
    },
    email: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        default: true,
        required: true
    },
    roll: {
        type: String,
        default: "user"
    },
    imagen: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    versionKey: false
})

module.exports = mongoose.model('user', userModel)

/*
{
     "nombre":"Carlos",
     "apellido":"Martinez",
     "edad": 18,
     "activo": true,
     "email": "carlos@gmail.com",
     "password": "clave123",
     "imagen":""
}
*/