const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.desencriptarToken = async (req, res, next)=> {
    let token = req.headers.authorization
    if (token) {
        token = token.split(' ')[1]

        let JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
        jwt.verify(token, JWT_SECRET_KEY , (error, decoded)=>{
            
            if (error) {                
                res.status(401).send({error:"Token invalido"})
            } else {
                req.usuario = decoded
                next()
            }
        })

    } else {
        res.status(401).send({error:"Token no suministrado"})
    }

}