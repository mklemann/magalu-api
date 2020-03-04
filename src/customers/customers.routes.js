const express = require('express');
const { verifyJwt } = require('../_shared/login/login.controller');
const controller = require('./customers.controller');

const router = express.Router();

router.get('/customers', verifyJwt, controller.get);
router.get('/customer/:id', verifyJwt, controller.getById);
router.post('/customer', verifyJwt, controller.post);
router.put('/customer/:id', verifyJwt, controller.update);
router.delete('/customer/:id', verifyJwt, controller.delete);

router.post('/customer/:customerId/favorite', verifyJwt, controller.favoriteProduct);
router.delete('/customer/:customerId/product/:productId/favorite', verifyJwt, controller.removeFavoriteProduct);

module.exports = router;