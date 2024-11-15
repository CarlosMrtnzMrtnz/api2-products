const express = require('express')
const router = express.Router()
const productsController = require('../controllers/product.controller')

router.get('/products', productsController.getProducts)
router.get('/product/:id', productsController.getOneProduct)
router.post('/addproduct', productsController.addProduct)
router.delete('/deleteproduct/:id', productsController.deleteProduct)
router.put('/updateproduct/:id', productsController.updateProduct)

module.exports = router