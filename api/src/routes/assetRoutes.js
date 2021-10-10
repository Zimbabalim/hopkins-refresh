import express from 'express';
import uploadImages from '../controllers/asset/uploadImages.js';

const router = express.Router();

router.post('/asset/uploadImages', uploadImages);

export default router;
