
import User from '../../models/User.model.js';
import getMany from '../generic/getMany.js';
import methods from '../utils/methods.js';

export const getManyUsers = async (req, res) => {
  
  // TODO specify range, filter by some other key
  // recipes/?category=Cookies
  // ?limit=100&page=3
  
  const query = methods.decorateQuery('find', User, req.query);
  console.log('/getManyUsers/ -getManyUsers', req.query);
  
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
