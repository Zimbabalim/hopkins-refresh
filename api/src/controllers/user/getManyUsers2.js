
import User from '../../models/User.model.js';

export const getManyUsers = async (req, res) => {
  let data;
  try {
    data = await User.find({});

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

export default getManyUsers;
