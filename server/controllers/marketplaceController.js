const asyncHandler = require('express-async-handler');
const Marketplace = require('../models/marketplaceModel.js');
const cloudinary = require('../config/cloudinary.js');

// @desc    Fetch all listings
// @route   GET /api/marketplace
// @access  Public
const getListings = asyncHandler(async (req, res) => {
  const listings = await Marketplace.find({}).populate('user', 'name');
  res.json(listings);
});

// @desc    Create a listing
// @route   POST /api/marketplace
// @access  Private
const createListing = asyncHandler(async (req, res) => {
  const { title, description, price, category } = req.body;

  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('Please upload at least one image');
  }

  const imageUrls = [];
  for (const file of req.files) {
    const result = await cloudinary.uploader.upload(file.path);
    imageUrls.push(result.secure_url);
  }

  const listing = new Marketplace({
    title,
    description,
    price,
    category,
    images: imageUrls,
    user: req.user._id,
  });

  const createdListing = await listing.save();
  res.status(201).json(createdListing);
});

// @desc    Update a listing
// @route   PUT /api/marketplace/:id
// @access  Private
const updateListing = asyncHandler(async (req, res) => {
  const { title, description, price, category } = req.body;

  const listing = await Marketplace.findById(req.params.id);

  if (listing.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  if (listing) {
    listing.title = title || listing.title;
    listing.description = description || listing.description;
    listing.price = price || listing.price;
    listing.category = category || listing.category;

    if (req.files && req.files.length > 0) {
      const imageUrls = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }
      listing.images = imageUrls;
    }

    const updatedListing = await listing.save();
    res.json(updatedListing);
  } else {
    res.status(404);
    throw new Error('Listing not found');
  }
});

// @desc    Delete a listing
// @route   DELETE /api/marketplace/:id
// @access  Private
const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Marketplace.findById(req.params.id);

  if (listing.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  if (listing) {
    await listing.remove();
    res.json({ message: 'Listing removed' });
  } else {
    res.status(404);
    throw new Error('Listing not found');
  }
});

module.exports = {
  getListings,
  createListing,
  updateListing,
  deleteListing,
};
