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
    data = await User.findOneAndUpdate(
        {_id: id},
        {
          company: req.body.company,
          email: req.body.email,
          full_name: req.body.full_name,
          swatches: req.body.swatches,
          rich_swatches: req.body.rich_swatches,
          user_log: req.body.user_log,
          user_notes: req.body.user_notes,
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
        message: 'updated user',
        success: true,
        data
      })
}

export default updateUser;
