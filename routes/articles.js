const express = require('express')
const router = express.Router()
const articleController = require('../articleController')

router.get('/', (req, res) =>{
    (new articleController(req, res)).list()
})

router.post('/', (req, res) => {
   (new articleController(req, res)).add()
})

router.put('/:id', (req,res) => {
    (new articleController(req, res)).update()
})

router.delete('/:id', (req,res) => {
   (new articleController(req, res)).delete()
})

module.exports = router