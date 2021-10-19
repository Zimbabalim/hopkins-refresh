import Product from '../../models/Product.model.js';

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
    default_product_code: '',
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
          message: 'unsaved - please add a name',
          uiStatus: {
            message: 'unsaved - please add a name',
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
      })
}

export default createProduct;
