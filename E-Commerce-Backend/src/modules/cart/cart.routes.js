const express = require('express');
const Joi = require('joi');
const router = express.Router();
const cartController = require('./cart.controller');
const { authenticate } = require('../../shared/middleware/auth.middleware');
const { validate, validateParams } = require('../../shared/middleware/validation.middleware');

router.use(authenticate);

router.get('/', cartController.viewCart);
router.post('/add', validate('addToCart'), cartController.addItem);
router.put('/update', validate('updateCartItem'), cartController.updateItem);
router.delete('/item/:cart_id', validateParams(Joi.object({ cart_id: Joi.number().integer().positive().required() })), cartController.removeItem);
router.delete('/clear', cartController.clearAll);

module.exports = router;
