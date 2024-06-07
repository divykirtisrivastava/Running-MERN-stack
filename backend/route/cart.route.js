const express = require('express')
const uploads = require('../multerConfig.js')
const router = express.Router()
const cartController = require('../controller/cart.controller.js')

router.post('/saveCart/:username',uploads.single('productImages'), cartController.cartSave)

router.get('/getCart/:username', cartController.getCart)

router.delete('/deleteCart/:id/:username', cartController.deleteCart)
module.exports = router