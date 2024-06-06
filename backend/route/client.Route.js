const express=require('express')
const clientController=require('../controller/client.controller.js')
const router=express.Router()
const uploads = require('../multerConfig.js')

router.post('/clientSave', uploads.single('image'), clientController.clientSave)
router.post('/clientLogin', clientController.clientLogin)

module.exports = router