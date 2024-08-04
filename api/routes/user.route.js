import express from 'express';  // import express
import { test } from '../controllers/user.controller.js';  // import your controller

const router = express.Router(); // create express router

router.get('/test', test);  // get request for test

export default router;  // export the router
