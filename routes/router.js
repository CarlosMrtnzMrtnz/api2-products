const express = require('express')
const router = express.Router()
const productsController = require('../controllers/product.controller')
const userController = require('../controllers/user.controller')
const { desencriptarToken } = require('../middleware/jwt')
const jwt = require('../middleware/jwt')

router.get('/products/:nombre?',desencriptarToken, productsController.getProducts)
router.get('/product/:id', productsController.getOneProduct)
router.post('/addproduct', productsController.addProduct)
router.delete('/deleteproduct/:id',desencriptarToken, productsController.deleteProduct)
router.put('/updateproduct/:id', productsController.updateProduct)

// ----------------------- rutas usuarios -------------------

router.get('/users',jwt.desencriptarToken, userController.getUser)
router.get('/user/:id', userController.getOneUser)
router.post('/adduser', userController.addUser)
router.delete('/deleteuser/:id', userController.deleteUser)
router.put('/updateuser/:id', userController.updateUser)
router.post('/session', userController.session)

module.exports = router