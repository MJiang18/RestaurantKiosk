const express = require('express');
const router = express.Router();
const {
  // PRIVATE ROUTE
  getPrivateRoute,
} = require('../controllers/private');
const { protect } = require('../middleware/auth');
// PRIVATE ROUTE
router.route('/').get(protect, getPrivateRoute);
module.exports = router;