import User from '../../models/User.model.js';
import mongoose from 'mongoose';

export const updateUser = async (req, res) => {
  console.log('\n*** /USER.controller/ -updateUser\n', req.body);
  
  const {id} = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  
  if(!req.body || !isValid){
    res
        .status(400)
        .send({
          message: 'user cannot be empty / id was invalid',
          success: false
        });
  }
  
  let data;
  try {
    data = await User.findByIdAndUpdate(
        id,
        {
          email: req.body.email,
          full_name: req.body.full_name
        }, {
          new: true
        }
    )
  } catch (error) {
    console.error('/USER.controller/ -updateUser --FUCKED', error);
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

export default updateUser;
