const express = require('express')
const router = express.Router()
const productController = require('../controller/product.controller.js')

router.post('/saveProduct', productController.saveProduct)

router.get('/getProduct', productController.getProduct)

router.get('/getDataById/:id', productController.getProductById)

router.delete('/deleteProduct/:id', productController.deleteProduct)
router.put('/updateProduct/:id',productController.updateProduct)
module.exports = router