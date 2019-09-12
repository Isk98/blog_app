const express = require('express')
const router = express.Router()
const loginController = require('../loginController')

router.post('/',(req, res) => {
    (new loginController(req,res)).create()
    
})



module.exports = router