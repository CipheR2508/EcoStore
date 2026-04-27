const express = require('express');
const router = express.Router();

const { authenticate } = require('../../../shared/middleware/auth.middleware');
const requireAdmin = require('../../../shared/middleware/requireAdmin.middleware');

// GET /api/v1/admin/users
router.get(
  '/users',
  authenticate,
  requireAdmin,
  async (req, res) => {
    try {
      const [users] = await req.db.query(`
        SELECT 
          user_id,
          email,
          first_name,
          last_name,
          is_active,
          created_at
        FROM users
        ORDER BY created_at DESC
      `);

      res.json({
        success: true,
        data: users
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: { message: 'Failed to fetch users' }
      });
    }
  }
);

module.exports = router;
