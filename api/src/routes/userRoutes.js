import express from 'express';
import getManyUsers from '../controllers/user/getManyUsers.js';
import createUser from '../controllers/user/createUser.js';
import getUser from '../controllers/user/getUser.js';
import deleteUser from '../controllers/user/deleteUser.js';
import updateUser from '../controllers/user/updateUser.js';
import updateUserSwatches from '../controllers/user/updateUserSwatches.js';

const router = express.Router();

router.get('/user', getManyUsers); // *** get all
router.get('/user/:id', getUser); // *** get one by id
router.post('/user', createUser); // *** create a new one
router.delete('/user/:id', deleteUser); // *** delete one
router.patch('/user/:id', updateUser); // *** modify one

// router.patch('/update-user-swatches/:id', updateUserSwatches); // *** get all
router.get('/update-user-swatches/', updateUserSwatches); // *** get all

export default router;
