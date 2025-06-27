const express = require('express');
const router = express.Router();
const {
  createGroup,
  getGroups,
  joinGroup,
  leaveGroup,
  getGroupChat,
  sendChatMessage,
} = require('../controllers/groupController.js');
const { protect } = require('../middleware/authMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');

router.route('/').post(protect, createGroup).get(protect, getGroups);
router.route('/:id/join').put(protect, joinGroup);
router.route('/:id/leave').put(protect, leaveGroup);
router.route('/:id/chat').get(protect, getGroupChat).post(protect, upload, sendChatMessage);

module.exports = router;
