// Desc: Middleware to verify user token

import jwt from 'jsonwebtoken';
import { errorhandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorhandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return next(errorhandler(403, "Forbidden"));
    }

    req.user = user;
    next();
  });

};