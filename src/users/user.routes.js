const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const { verifyJwt } = require('../_shared/login/login.controller');

router.post('/users', controller.post);
router.get('/users', verifyJwt, controller.get);
router.delete('/users/:id', verifyJwt, controller.delete);

module.exports = router;