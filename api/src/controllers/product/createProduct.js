import Product from '../../models/Product.model.js';
import Design from '../../models/configFragments/Design.model.js';

/**
 * initial singular product/design creation. also adds an entry to separate collection 'config_designs',
 * which is actually responsible for making the design available on .com
 */
export const createProduct = async (req, res) => {
  console.log('\n*** /PRODUCT.controller/ -createProduct\n', req.body);
  console.log('/createProduct/ ******************************************************');
  if(!req.body){
    res
        .status(400)
        .send({
          message: 'PRODUCT cannot be empty...',
          success: false
        });
  }
  
  const cleanStrings = {
    code: req.body.code.replace(/\//g, ''),
    uid: req.body.friendly_name.replace(/ /g, '_'), // *** for config design (spaces with underscore)
  }
  
  // *** ugly but works
  const query = Product.find({friendly_name: req.body.friendly_name});
  
  let checkExisting = null;
  
  try {
    checkExisting = await query.exec();
  } catch (error) {
    console.log('/createProduct/ -createProduct ERROR');
    return false;
  }
  
  if (checkExisting.length > 0) {
    res.status(200).send({ // *** 200 so doesn't error, but passes message with fail
      message: 'unsaved - product already exists...',
      uiStatus: {
        message: 'unsaved - product already exists...',
        className: '--error',
      },
      success: false
    });
  }
  
  
  const product = new Product({
    friendly_name: req.body.friendly_name,
    default_product_code: req.body.code, // FIXIT is this correct at the point of creation?
    variations: [],
  });
  
  let data;
  try {
    data = await product.save();
  } catch (error) {
    console.error('/USER.controller/ -createProduct --FUCKED', error);
    res
        .status(200)
        .send({
          message: 'unsaved - incomplete data',
          uiStatus: {
            message: 'unsaved - incomplete data',
            className: '--error',
          },
          success: false
        });
  }
  
  res
      .status(201)
      .send({
        message: 'saved new product!',
        uiStatus: {
          message: 'saved new product!',
          className: '--success',
        },
        success: true,
        data
      });
  
  // *** 5.10.22
  // *** also add entry to 'config_designs' collection - this is the lookup that will allow the entry to appear on the .com site
  // TODO seems to work, but there is no visibility for failure, this class has become a dirty composite
  const configDesign = new Design({
    code: cleanStrings.code,
    label: req.body.friendly_name,
    uid: cleanStrings.uid,
  });
  
  try {
    await configDesign.save();
  } catch (error) {
    console.error('/USER.controller/ -createProduct [configDesign] --ERROR', error);
  }
  console.log('/createProduct/ -createProduct [configDesign] --SUCCESS');
}

export default createProduct;
