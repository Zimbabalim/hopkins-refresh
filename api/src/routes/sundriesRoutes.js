import express from 'express';
import getSundries from '../controllers/sundries/getSundries.js';
// import getManyProducts from '../controllers/product/getManyProducts.js';
// import createProduct from '../controllers/product/createProduct.js';
// import updateProduct from '../controllers/product/updateProduct.js';
// import deleteProduct from '../controllers/product/deleteProduct.js';

const router = express.Router();

router.get('/sundries', getSundries); // *** get all

// router.post('/product', createProduct); // *** create a new one
// router.delete('/product/:id', deleteProduct); // *** delete one
// router.patch('/product/:id', updateProduct); // *** modify one

export default router;
