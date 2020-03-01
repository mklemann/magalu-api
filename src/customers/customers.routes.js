const express = require('express')
const router = express.Router()

const controller = require('./customers.controller')

router.get('/customers', controller.get)
router.get('/customer/:id', controller.getById)

router.post('/customer', controller.post)

router.put('/customer/:id', controller.update)
// router.delete('/customer/:id', controller.get)

module.exports = router