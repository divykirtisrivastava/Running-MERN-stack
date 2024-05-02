const express = require('express')
const router = express.Router()
const userController = require('../controller/userController.js')

router.post('/' , userController.saveData)

router.get('/', userController.submitFile)
router.get('/viewData', userController.viewFile)

router.get('/getData' , userController.getData)

router.delete('/deleteData/:id' , userController.deleteData)

router.put('/updateData/:id' , userController.updateProduct)

module.exports = router






