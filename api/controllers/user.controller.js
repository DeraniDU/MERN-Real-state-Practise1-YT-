import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorhandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';


export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};

// update user controller function to update a user in the database 

export const updateUser = async (req, res, next) => {


  if (!req.params.id) {
    return next(errorhandler(400, 'User ID is missing in the request.'));
  }

  if (req.user.userId !== req.params.id)
    return next(errorhandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          contact: req.body.contact,
          username: req.body.username,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// delete user controller function to delete a user in the database


export const deleteUser = async (req, res, next) => {
  if (req.user.userId !== req.params.id)
    return next(errorhandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    next(error);
  }
};

// get user's listings controller function to get all the listings of a user from the database

export const getUsersListings = async (req, res, next) => {
  if (req.user.userId === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }

  } else {
    return next(errorhandler(401, 'You can only view your own listings!'));
  }

};

// get user controller function to get a user from the database

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(errorhandler(404, 'User not found!'));
    }

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);

  } catch (error) {
    next(error);
  }


}