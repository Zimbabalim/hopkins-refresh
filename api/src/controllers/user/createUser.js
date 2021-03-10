// import USER from '../../models/testing/USER.model';
import User from '../../models/User.model.js';

export const updateUser = async (req, res) => {
  console.log('\n*** /USER.controller/ -updateUser\n', req.body);
  if(!req.body){
    res
        .status(400)
        .send({
          message: 'USER cannot be empty...',
          success: false
        });
  }
  
  const user = new User({
    email: req.body.email,
    full_name: req.body.full_name
  });
  
  let data;
  try {
    data = await user.save();
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
