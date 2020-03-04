const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

router.post('/users', controller.post);
router.get('/users', controller.get);
router.delete('/users/:id', controller.delete);

module.exports = router;