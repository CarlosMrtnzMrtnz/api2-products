const express = require('express')
const router = express.Router()
const productsController = require('../controllers/product.controller')
const userController = require('../controllers/user.controller')

router.get('/products', productsController.getProducts)
router.get('/product/:id', productsController.getOneProduct)
router.post('/addproduct', productsController.addProduct)
router.delete('/deleteproduct/:id', productsController.deleteProduct)
router.put('/updateproduct/:id', productsController.updateProduct)

// ----------------------- rutas usuarios -------------------

router.get('/users', userController.getUser)
router.get('/user/:id', userController.getOneUser)
router.post('/adduser', userController.addUser)
router.delete('/deleteuser/:id', userController.deleteUser)
router.put('/updateuser/:id', userController.updateUser)

module.exports = router