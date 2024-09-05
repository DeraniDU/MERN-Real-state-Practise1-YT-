import User from "../models/user.model.js";

import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

// Export the test function
export const test = (req, res) => {
    res.json({
        message: "hello world",
    });
};

// Export the updateUser function
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only update your own account'));
    }

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true });

        if (!updateUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const { password, ...rest } = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        console.error('Error updating user:', error);
        next(error); // Pass the error to the global error handler
    }
};
