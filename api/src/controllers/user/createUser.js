import User from '../../models/User.model.js';

export const updateUser = async (req, res) => {
  console.log('\n*** /USER.controller/ -createUser\n', req.body);
  console.log('/createUser/ -updateUser ******************************************************');
  if(!req.body){
    res
        .status(400)
        .send({
          message: 'USER cannot be empty...',
          success: false
        });
  }
  

  // *** ugly but works
  const query = User.find({email: req.body.email});
  
  let checkExisting = null;
  
  try {
    checkExisting = await query.exec();
  } catch (error) {
    console.log('/createUser/ -updateUser ERROR');
    return false;
  }
  
  if (checkExisting.length > 0) {
    res.status(200).send({ // *** 200 so doesn't error, but passes message with fail
      message: 'unsaved - user already exists...',
      uiStatus: {
        message: 'unsaved - user already exists...',
        className: '--error',
      },
      success: false
    });
  }
  
  
  const user = new User({
    company: req.body.company,
    email: req.body.email,
    full_name: req.body.full_name,
    swatches: [],
    rich_swatches: [],
    user_log: [],
    user_notes: '',
  });
  
  let data;
  try {
    data = await user.save();
  } catch (error) {
    console.error('/USER.controller/ -updateUser --FUCKED', error);
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
        message: 'saved new user!',
        uiStatus: {
          message: 'saved new user!',
          className: '--success',
        },
        success: true,
        data
      })
}

export default updateUser;
