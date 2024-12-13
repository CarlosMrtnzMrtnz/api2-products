const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.payload = async (req, res)=> {
    try {
        let token = req.headers
        let SECRET_KEY_JWT = process.env.SECRET_KEY_JWT
        if (token) {
            token = token.split(' ')[1]
            jwt.verify(token, SECRET_KEY_JWT, (error, decoded)=>{
                if (error) {
                    res.status(401).send({error:"Token invalido"})
                }
                
                res.status(200).json(decoded)
            })
        } else {
            res.status(400).send({error:"Token no proporcionado"})
        }
    } catch (error) {
        res.status(500).send({error:"Ha ocurrido algo comunicate con el admin"})
    }
}