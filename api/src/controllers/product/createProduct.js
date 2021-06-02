// import USER from '../../models/testing/USER.model';
import Product from '../../models/Product.model.js';

export const createProduct = async (req, res) => {
  console.log('\n*** /USER.controller/ -createProduct\n', req.body);
  if(!req.body){
    res
        .status(400)
        .send({
          message: 'PRODUCT cannot be empty...',
          success: false
        });
  }
  
  const product = new Product({
    friendly_name: req.body.friendly_name,
    default_product_code: req.body.default_product_code,
    variations: req.body.variations,
  });
  
  let data;
  try {
    data = await product.save();
  } catch (error) {
    console.error('/USER.controller/ -createProduct --FUCKED', error);
    res
        .status(500)
        .send({
          message: 'totally fucked',
          success: false
        });
  }
  
  res
      .status(201)
      .send({
        message: 'it worked!!!',
        success: true,
        data
      })
}

export default createProduct;
