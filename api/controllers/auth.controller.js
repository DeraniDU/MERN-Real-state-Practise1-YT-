import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorhandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


// signup controller function to create a new user in the database and return a success message 

export const signup = async (req, res, next) => {
  const { name, email, contact, gender, username, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({ 
    name, 
    email, 
    contact, 
    gender, 
    username, 
    password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json({ message: "Signup successful" });

  } catch (error) {
    next(error);
  }
};

// signin controller function to authenticate a user and return a success message

export const signin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validUser = await User.findOne({ username });
    if (!validUser) return next(errorhandler(401, "Username not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorhandler(405, "Invalid password"));
    
    const token = jwt.sign({ userId: validUser._id }, process.env.JWT_SECRET);


    const { password: userPassword, ...rest } = validUser._doc;
    res.cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(validUser);

  } catch (error) {
    next(error);

  }

};

// google controller function to authenticate a user using google and return a success message

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      const { password: userPassword, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);

    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        name: req.body.name
          .split(" ")
          .join("")
          .toLowerCase() 
          + Math.random().toString(36).slice(-4),
        email: req.body.email,        
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
      const { password: userPassword, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

// signout controller function to clear the cookie and return a success message

export const signout = (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json({ message: "Signout successful" });
    
  } catch (error) {
    next(error);
  }
};


