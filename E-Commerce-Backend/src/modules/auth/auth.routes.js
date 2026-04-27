const express = require('express');
const router = express.Router();
const auth = require('./auth.controller');
const { validate } = require('../../shared/middleware/validation.middleware');

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/signup', validate('signup'), auth.signup);
router.get('/verify-email', auth.verifyEmail);
router.post('/login', validate('login'), auth.login);
router.post('/admin/login', validate('login'), auth.adminLogin);
router.post('/forgot-password', validate('forgotPassword'), auth.forgotPassword);
router.post('/reset-password', validate('resetPassword'), auth.resetPassword);

module.exports = router;
