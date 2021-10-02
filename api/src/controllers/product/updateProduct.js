import User from '../../models/Product.model.js';
import mongoose from 'mongoose';

export const updateProduct = async (req, res) => {
  console.log('\n*** /PRODUCT.controller/ -updateProduct ==== \n', req.body);
  
  const {id} = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  
  if(!req.body || !isValid){
    res
        .status(400)
        .send({
          message: 'product cannot be empty / id was invalid',
          success: false
        });
  }
  
  let data;
  try {
    data = await User.findOneAndUpdate(
        {_id: id},
        {
          // RESTORE!
          default_product_code: req.body.default_product_code,
          friendly_name: req.body.friendly_name,
          variations: req.body.variations,
        }, {
          new: true
        }
    )
  } catch (error) {
    console.error('/USER.controller/ -updateProduct --FUCKED', error);
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

export default updateProduct;
