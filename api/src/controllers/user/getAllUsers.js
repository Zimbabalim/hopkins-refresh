
import User from '../../models/User.model.js';

export const getAllUsers = async (req, res) => {
  let data;
  try {
    data = await User.find({});
    
    // *** this works:
    /*data = await User.find({
      full_name: 'NEW 3'
    });*/
  } catch (error) {
    console.error('/getAllUsers/ -getAllUsers', error);
    res
        .status(500)
        .send({
          message: 'totally fucked',
          success: false
        });
  }
  res.send({
    data,
    success: true
  });
}

export default getAllUsers;
