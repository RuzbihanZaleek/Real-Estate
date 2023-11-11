const errorHandler = require('../utils/errorHandler.utils');
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model.js');
const Listings = require('../models/listing.model.js');

const test = (req, res) => {
  res.json({
    message: 'Hello world API Route',
  });
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account.'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    // new: true for update new information of the user. Otherwise will get the previous information

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can delete your own account'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

const getUserListings = async (req, res, next) => {
  if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only view your own listings'));
  try {
    const listings = await Listings.find({ userRef: req.params.id });
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

module.exports = { test, updateUser, deleteUser, getUserListings };
