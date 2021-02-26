import express from 'express';
import * as testController from '../controllers/test.controller.js';

const router = express.Router();

router.get('/test', testController.testRes);
router.get('/ping-db', testController.pingRes);

export default router;
