import express from 'express';
import uploadImages from '../controllers/asset/uploadImages.js';
import uploadSundriesImages from '../controllers/asset/uploadSundriesImages.js';

const router = express.Router();

router.post('/asset/uploadImages', uploadImages);
router.post('/asset/uploadSundriesImages', uploadSundriesImages);

export default router;
