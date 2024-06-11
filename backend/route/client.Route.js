const express=require('express')
const clientController=require('../controller/client.controller.js')
const router=express.Router()
const uploads = require('../multerConfig.js')

router.post('/clientSave', uploads.single('image'), clientController.clientSave)
router.post('/clientLogin', clientController.clientLogin)

router.get('/createClient/:username', clientController.createClient)

router.get('/getClient/:username', clientController.getClient)
router.get('/profile', clientController.profile)

module.exports = router