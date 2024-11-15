const mongoose = require('mongoose')

const productsModel = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    disponible: {
        type: Boolean,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    tipo: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    serie: {
        type: String,
        required: true
    }
},{
    versionKey: false
}
)

module.exports = mongoose.model('product', productsModel)

/*
{
    "nombre":"televisor",
    "precio":150000,
    "disponible": true,
    "descripcion":'TV OLED de 43 marca Samsung',
    "tipo": "electrodomestico",
    "marca": "Samsung",
    "serie":"tv123OLED43"
}
*/