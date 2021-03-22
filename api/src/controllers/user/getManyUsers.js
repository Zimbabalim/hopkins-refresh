
import User from '../../models/User.model.js';
import getMany from '../generic/getMany.js';

export const getManyUsers = async (req, res) => {
  
  let data = await getMany(req, res, {
    model: User,
    filter: {}
  });
  console.log('/getManyUsers/ -getManyUsers', data);
  
  res.send({
    data // *** FIXIT payload is wrapped in 'data' twice
  })
  
  /*let data;
  try {
    data = await User.find({});
    
    // *** this works:
    /!*data = await User.find({
      full_name: 'NEW 3'
    });*!/
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
  });*/
}

export default getManyUsers;
