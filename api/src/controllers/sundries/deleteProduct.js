import mongoose from 'mongoose';
import Product from '../../models/Product.model.js';

export const deleteProduct = async (req, res) => {
  
  console.log('/deleteProduct/ -deleteProduct', req.params);
  
  const {id} = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  
  if (!isValid) {
    res
        .status(400)
        .send({
          message: 'invalid request (ObjectId)',
          success: false,
        })
  }
  
  let data;
  try {
    data = await Product.deleteOne({_id: id});
  } catch (error) {
    res
        .status(500)
        .send({
          message: 'totally fucked',
          success: false,
        });
  }
  
  res.send({
    data,
    success: true
  });
}

export default deleteProduct;
