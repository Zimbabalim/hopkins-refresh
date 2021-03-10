import express from 'express';
import getAllUsers from '../controllers/user/getAllUsers.js';
import createUser from '../controllers/user/createUser.js';
import getUserById from '../controllers/user/getUserById.js';
import deleteUserById from '../controllers/user/deleteUserById.js';
import updateUser from '../controllers/user/updateUser.js';

const router = express.Router();

router.get('/user', getAllUsers); // *** get all
router.get('/user/:id', getUserById); // *** get one by id
router.post('/user', createUser); // *** create a new one
router.delete('/user/:id', deleteUserById); // *** delete one
router.patch('/user/:id', updateUser); // *** modify one

export default router;
