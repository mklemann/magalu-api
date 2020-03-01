const express = require('express')
const { verifyJwt } = require('../_shared/login/login.controller')
const router = express.Router()

const controller = require('./customers.controller')

router.get('/customers', verifyJwt, controller.get)
router.get('/customer/:id', verifyJwt, controller.getById)

router.post('/customer', verifyJwt, controller.post)

router.put('/customer/:id', verifyJwt, controller.update)
// router.delete('/customer/:id', controller.get)

module.exports = router