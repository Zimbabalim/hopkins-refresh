import mongoose from 'mongoose';
import User from '../../models/User.model.js';

export const deleteUser = async (req, res) => {
  
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
    data = await User.deleteOne({_id: id});
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

export default deleteUser;
