const express = require('express');
const router = express.Router();
const invoiceController = require('./invoices.controller');
const { authenticate } = require('../../shared/middleware/auth.middleware');

router.use(authenticate);

// Generate invoice
router.post('/generate', invoiceController.createInvoice);

// Get invoice by order
router.get('/order/:order_id', invoiceController.getInvoice);

module.exports = router;
