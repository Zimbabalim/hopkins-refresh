import express from 'express';

import getColours from '../controllers/configFragments/getColours.js';
import getFabrics from '../controllers/configFragments/getFabrics.js';
import getDesigns from '../controllers/configFragments/getDesigns.js';

const router = express.Router();

router.get('/config_colours', getColours); // *** get all
router.get('/config_fabrics', getFabrics); // *** get all
router.get('/config_designs', getDesigns); // *** get all
// router.post('/config_designs', createDesign); // *** get all

/*router.get('/product', getManyProducts); // *** get all
router.post('/product', createProduct); // *** create a new one
router.delete('/product/:id', deleteProduct); // *** delete one
router.patch('/product/:id', updateProduct); // *** modify one*/

export default router;
