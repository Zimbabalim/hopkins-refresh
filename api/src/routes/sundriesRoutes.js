import express from 'express';
import getSundries from '../controllers/sundries/getSundries.js';
import createSundries from '../controllers/sundries/createSundries.js';
import deleteSundries from '../controllers/sundries/deleteSundries.js';
// import getManyProducts from '../controllers/product/getManyProducts.js';
// import createProduct from '../controllers/product/createProduct.js';
// import updateProduct from '../controllers/product/updateProduct.js';
// import deleteProduct from '../controllers/product/deleteProduct.js';

const router = express.Router();

router.get('/sundries', getSundries); // *** get all
router.post('/sundries', createSundries); // *** create a new one
router.delete('/sundries/:id', deleteSundries); // *** delete one
// router.patch('/product/:id', updateProduct); // *** modify one

export default router;
