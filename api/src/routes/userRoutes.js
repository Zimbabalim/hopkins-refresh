import express from 'express';
// import {getAllUsers} from '../controllers/user/getAllUsers.js';
import * as controllers from '../controllers/user/index.js';

const router = express.Router();

router.get('/user', controllers.getAllUsers); // *** get all
router.get('/user/:id', () => {}); // *** get one
router.post('/user', () => {}); // *** send one
router.delete('/user/:id', () => {}); // *** delete one
router.patch('/user/:id', () => {}); // *** modify one

export default router;
