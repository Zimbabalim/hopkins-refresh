import express from 'express';
import getManyProducts from '../controllers/product/getManyProducts.js';
import createProduct from '../controllers/product/createProduct.js';

const router = express.Router();

router.get('/product', getManyProducts); // *** get all


// router.get('/product/:id', getProduct); // *** get one by id
router.post('/product', createProduct); // *** create a new one
// router.delete('/product/:id', deleteProduct); // *** delete one
// router.patch('/product/:id', updateProduct); // *** modify one

export default router;
