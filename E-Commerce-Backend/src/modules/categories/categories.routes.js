const express = require('express');
const router = express.Router();
const categoryController = require('./categories.controller');

router.get('/', categoryController.getCategories);

module.exports = router;
