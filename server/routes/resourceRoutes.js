const express = require('express');
const router = express.Router();
const {
  getResources,
  createResource,
  rateResource,
} = require('../controllers/resourceController.js');
const { protect } = require('../middleware/authMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');

router.route('/').get(getResources).post(protect, upload, createResource);
router.route('/:id/rate').post(protect, rateResource);

module.exports = router;
