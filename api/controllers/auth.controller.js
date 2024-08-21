import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// Signup controller
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Hash the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create a new user
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    // Save the new user
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

// Signin controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const validUser = await User.findOne({ email });

    // Check if user exists
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    // Compare passwords
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    // Generate a JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// Google OAuth controller
export const google = async (req, res, next) => {
  const { email, name, avatar } = req.body;

  // Validate required fields
  if (!email || !name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Find existing user by email
    let user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, create a new user
      user = new User({
        username: name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
        email,
        password: bcryptjs.hashSync(Math.random().toString(36).slice(-16), 10),
        avatar
      });

      await user.save();
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response
    const { password: pass, ...rest } = user._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);

  } catch (error) {
    console.error('Error in Google authentication:', error);
    next(error);
  }
};

