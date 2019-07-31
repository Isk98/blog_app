const express = require('express')
const router = express.Router()
const articlesController = require('../articlesController')

router.get('/', (req, res) =>{
    (new articlesController(req, res)).list()
})

router.get('/:id', (req, res) =>{
    (new articlesController(req, res)).show()
})

router.post('/', (req, res) => {
   (new articlesController(req, res)).add()
})

router.put('/:id', (req,res) => {
    (new articlesController(req, res)).update()
})

router.delete('/:id', (req,res) => {
   (new articlesController(req, res)).delete()
})

module.exports = router