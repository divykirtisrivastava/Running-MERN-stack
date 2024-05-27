const express = require('express')
const uploads = require('../multerConfig.js')
const router = express.Router()
const cartController = require('../controller/cart.controller.js')

router.post('/saveCart',uploads.single('productImages'), cartController.cartSave)

router.get('/getCart', cartController.getCart)

router.delete('/deleteCart/:id', cartController.deleteCart)
module.exports = router