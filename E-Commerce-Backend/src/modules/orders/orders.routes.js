const express = require('express');
const Joi = require('joi');
const router = express.Router();
const orderController = require('./orders.controller');
const { authenticate } = require('../../shared/middleware/auth.middleware');
const { validate, validateParams } = require('../../shared/middleware/validation.middleware');

router.use(authenticate);

router.post('/', validate('createOrder'), orderController.placeOrder);
router.get('/', orderController.listOrders);
router.get('/:order_id', validateParams(Joi.object({ order_id: Joi.number().integer().positive().required() })), orderController.getOrder);

module.exports = router;
