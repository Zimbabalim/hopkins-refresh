import express from 'express';
import * as controller from '../../controllers/testing/foo.controller.js';
const router = express.Router();

router.get('/foo', controller.getAllFoos); // *** get all
router.get('/foo/:id', controller.getOneFoo); // *** get one
router.post('/foo', controller.createFoo); // *** send ???
router.delete('/foo/:id', () => {}); // *** delete one
router.patch('/foo/:id', () => {}); // *** modify one

export default router;
