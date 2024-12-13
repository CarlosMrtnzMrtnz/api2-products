const userModel = require("../models/user.model")
require('dotenv').config()
const jwt = require('jsonwebtoken')
exports.getUser = async (req, res)=> {
    try {
        let data = await userModel.find()
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).send({error:"Ha ocurrido un error comunicate con el admin"})
    }
}

exports.getOneUser = async (req, res)=> {
    try {
        let id = req.params.id
        let user = await userModel.findOne({_id:id})
        res.status(200).json(user)
        
    } catch (error) {
        console.log(error);
        res.status(500).send({error:"Ha ocurrido un error comunicate con el admin"})
    }
}

exports.deleteUser = async (req, res)=> {
    try {
        let id = req.params.id
        if (id.length == 24) {   
            let user = await userModel.findById(req.params.id)
            if (user) {
                let deleteado = await userModel.findOneAndDelete({_id: id})
                console.log("Usuario eliminado correctamente");
                res.status(200).json(deleteado)
            } else {
                console.log("Usuario no encontrado");
                res.status(400).send({msj:"Usuario no encontrado"})
            }
        } else {
            res.status(400).send({msj:"Id no contiene los caracteres suficientes"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error:"Ha ocurrido un error comunicate con el admin"})
    }
}

exports.addUser = async (req, res)=>{
    try {
        let regexEmail = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/
        let email = req.body.email

        if (regexEmail.test(email)) {
            let exist = await userModel.findOne({email: email})
            if (!exist) {
                let user = req.body
                user.imagen = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAhEOYTOMNLDkzULpt0bj-RdWGvRsfw5S-aQ&s"
                let newUser = new userModel(user)
                await newUser.save()
                res.status(201).json(newUser)
            } else {
                res.status(400).send({error:"Correo ya existe"})
            }
        } else {
            res.status(400).send({error:"Correo Invalido"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({error:"Ha ocurrido un error comunicate con el admin"})        
    }
}

exports.updateUser = async (req, res)=> {
    try {
        let regexEmail = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/
        let id = await req.params.id
        let body = req.body
        if (regexEmail.test(body.email)) {
            if (id.length == 24) {
                let user = await userModel.findById(id)
                if (user) {
                    // user.nombre = body.nombre
                    // user.apellido = body.apellido
                    // user.edad = body.edad
                    // user.activo = body.activo
                    Object.assign(user, body)
                    await userModel.findOneAndUpdate({_id:id},user)
                    res.status(200).send("modificado")
                } else {
                    res.status(400).send({error:"Usuario no encontrado"})
                }
            } else {
                console.log("Id proporcionada no es correcta");
                res.status(400).send({error:"Id no contiene los caracteres suficientes"})
            }
        } else {
            res.status(400).send({error: "Correo Invalido"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error:"Ha ocurrido un error comunicate con el admin"})
    }
}

exports.session = async (req, res)=> {
    try {
        let body = req.body
        let user = await userModel.findOne({email: body.email})
        if (user) {
            if (user.password == body.password) {
                
                let payload = {
                    id: user._id,
                    nombre: user.nombre,
                    // imagen: user.imagen
                }
                let JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

                let token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn:"1h"})
                res.status(200).json(token)
            } else {
                res.status(400).send({error:"Password incorrecto!"})
            }
        } else {
            res.status(400).send({error:"Email incorrecto!"})
        }

    } catch (error) {
        res.status(500).send({error:"Ha ocurrido algo comunicate con el admin"})
    }
}


