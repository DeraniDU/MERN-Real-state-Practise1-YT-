import express from 'express';
import { signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/signup',signup);  // post request for signup
router.post('/signin',signin);
export default router;  // export userRoute