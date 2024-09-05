import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;  // Access the token from the cookies

    // If there's no token, return an "Unauthorized" error
    if (!token) return next(errorHandler(401, "Unauthorized"));

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, "Forbidden"));  // Fix typo and return "Forbidden" if token is invalid

        req.user = user;  // If valid, assign the user to the request object
        next();  // Continue to the next middleware
    });
};

        
    
