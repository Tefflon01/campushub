const asyncHandler = require('express-async-handler');
const Resource = require('../models/resourceModel.js');
const cloudinary = require('../config/cloudinary.js');

// @desc    Fetch all resources
// @route   GET /api/resources
// @access  Public
const getResources = asyncHandler(async (req, res) => {
  const resources = await Resource.find({}).populate('user', 'name');
  res.json(resources);
});

// @desc    Create a resource
// @route   POST /api/resources
// @access  Private
const createResource = asyncHandler(async (req, res) => {
  const { title, description, faculty, course } = req.body;

  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a file');
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    resource_type: 'auto',
  });

  const resource = new Resource({
    title,
    description,
    faculty,
    course,
    fileUrl: result.secure_url,
    user: req.user._id,
  });

  const createdResource = await resource.save();
  res.status(201).json(createdResource);
});

// @desc    Rate a resource
// @route   POST /api/resources/:id/rate
// @access  Private
const rateResource = asyncHandler(async (req, res) => {
  const { rating } = req.body;

  const resource = await Resource.findById(req.params.id);

  if (resource) {
    const alreadyRated = resource.ratings.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyRated) {
      res.status(400);
      throw new Error('Resource already rated');
    }

    const newRating = {
      rating: Number(rating),
      user: req.user._id,
    };

    resource.ratings.push(newRating);

    resource.numRatings = resource.ratings.length;

    resource.rating =
      resource.ratings.reduce((acc, item) => item.rating + acc, 0) /
      resource.ratings.length;

    await resource.save();
    res.status(201).json({ message: 'Rating added' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

module.exports = { getResources, createResource, rateResource };
