
import User from '../../models/User.model.js';
import getMany from '../generic/getMany.js';
import methods from '../utils/methods.js';

export const getManyUsers = async (req, res) => {
  
  const query = methods.decorateQuery('find', User, req.query);
  
  let payload = await getMany(req, res, {
    query
  });
  
  const {data, success} = payload;
  
  res.send({
    success,
    data
  });
}

export default getManyUsers;
