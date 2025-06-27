const express = require('express');
const router = express.Router();
const {
  getListings,
  createListing,
  updateListing,
  deleteListing,
} = require('../controllers/marketplaceController.js');
const { protect } = require('../middleware/authMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');

router.route('/').get(getListings).post(protect, upload, createListing);
router
  .route('/:id')
  .put(protect, upload, updateListing)
  .delete(protect, deleteListing);

module.exports = router;
