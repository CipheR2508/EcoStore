const express = require('express');
const router = express.Router();
const paymentController = require('./payments.controller');
const { authenticate } = require('../../shared/middleware/auth.middleware');

router.use(authenticate);

// Initiate payment
router.post('/initiate', paymentController.initiatePayment);

// Update payment status (gateway simulation)
router.put('/:payment_id/status', paymentController.updateStatus);

// Get payments for an order
router.get('/order/:order_id', paymentController.getOrderPayments);

module.exports = router;
