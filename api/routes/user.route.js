import express from 'express';  // import express
import { deleteUser, test, updateUser } from '../controllers/user.controller.js';  // import your controller
import { verifyToken } from '../utils/verifyUser.js';  // import your middleware
const router = express.Router(); // create express router

router.get('/test', test);  // get request for test
router.post('/update/:id', verifyToken, updateUser);  // post request for update use
router.delete('/delete/:id', verifyToken, deleteUser);  // delete request for delete user



export default router;  // export the router
