import mongoose from 'mongoose';
import Sundries from '../../models/Sundries.model.js';

export const deleteSundries = async (req, res) => {
  
  console.log('/deleteSundries/ -deleteSundries', req.params);
  
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
    data = await Sundries.deleteOne({_id: id});
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

export default deleteSundries;
