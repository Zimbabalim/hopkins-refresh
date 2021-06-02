
import User from '../../models/User.model.js';
import finder from '../generic/finder.js';
import methods from '../utils/methods.js';

export const getManyUsers = async (req, res) => {
  
  const query = methods.find({
    model: User,
    filters: req.query,
  });
  
  let payload = await finder(req, res, {
    query
  });
  
  const {data, success} = payload;
  
  res.send({
    success,
    data
  });
}

export default getManyUsers;
