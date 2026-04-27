const express = require('express');
const router = express.Router();
const controller = require('./preferences.controller');
const { authenticate } = require('../../shared/middleware/auth.middleware');

router.use(authenticate);

// Get all preferences
router.get('/', controller.getAll);

// Get one preference
router.get('/:key', controller.getOne);

// Create / Update preference
router.post('/', controller.upsert);

// Delete preference
router.delete('/:key', controller.remove);

module.exports = router;
