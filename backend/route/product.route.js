const express = require('express')
const router = express.Router()
const productController = require('../controller/product.controller.js')

router.post('/saveProduct', productController.saveProduct)

router.get('/getProduct', productController.getProduct)

module.exports = router