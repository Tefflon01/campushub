const asyncHandler = require('express-async-handler');
const Group = require('../models/groupModel.js');
const Message = require('../models/messageModel.js');
const cloudinary = require('../config/cloudinary.js');

// @desc    Create new group
// @route   POST /api/groups
// @access  Private
const createGroup = asyncHandler(async (req, res) => {
  const { name, description, memberLimit } = req.body;

  const group = new Group({
    name,
    description,
    memberLimit,
    members: [req.user._id],
  });

  const createdGroup = await group.save();
  res.status(201).json(createdGroup);
});

// @desc    Get all groups
// @route   GET /api/groups
// @access  Private
const getGroups = asyncHandler(async (req, res) => {
  const groups = await Group.find({}).populate('members', 'name');
  res.json(groups);
});

// @desc    Join a group
// @route   PUT /api/groups/:id/join
// @access  Private
const joinGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);

  if (group) {
    if (group.members.length < group.memberLimit) {
      const alreadyMember = group.members.find(
        (m) => m.toString() === req.user._id.toString()
      );
      if (alreadyMember) {
        res.status(400);
        throw new Error('Already a member of this group');
      }
      group.members.push(req.user._id);
      await group.save();
      res.json({ message: 'Joined group successfully' });
    } else {
      res.status(400);
      throw new Error('Group is full');
    }
  } else {
    res.status(404);
    throw new Error('Group not found');
  }
});

// @desc    Leave a group
// @route   PUT /api/groups/:id/leave
// @access  Private
const leaveGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);

  if (group) {
    group.members = group.members.filter(
      (m) => m.toString() !== req.user._id.toString()
    );
    await group.save();
    res.json({ message: 'Left group successfully' });
  } else {
    res.status(404);
    throw new Error('Group not found');
  }
});

// @desc    Get group chat
// @route   GET /api/groups/:id/chat
// @access  Private
const getGroupChat = asyncHandler(async (req, res) => {
  const messages = await Message.find({ group: req.params.id }).populate(
    'sender',
    'name profilePicture'
  );
  res.json(messages);
});

// @desc    Send chat message
// @route   POST /api/groups/:id/chat
// @access  Private
const sendChatMessage = asyncHandler(async (req, res) => {
  const { content } = req.body;
  let fileUrl = '';

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
    });
    fileUrl = result.secure_url;
  }

  const message = new Message({
    sender: req.user._id,
    content,
    group: req.params.id,
    fileUrl,
  });

  const createdMessage = await message.save();

  const populatedMessage = await Message.findById(createdMessage._id).populate(
    'sender',
    'name profilePicture'
  );

  res.status(201).json(populatedMessage);
});

module.exports = {
  createGroup,
  getGroups,
  joinGroup,
  leaveGroup,
  getGroupChat,
  sendChatMessage,
};
