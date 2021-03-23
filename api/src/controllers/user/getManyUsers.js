
import User from '../../models/User.model.js';
import getMany from '../generic/getMany.js';
import methods from '../utils/methods.js';

export const getManyUsers = async (req, res) => {
  
  // TODO specify range, filter by some other key
  // recipes/?category=Cookies
  // ?limit=100&page=3
  const z = methods.limit(); // TEST
  
  console.log('..................../getManyUsers/ -getManyUsers', req.query);
  
  let payload = await getMany(req, res, {
    model: User,
    filter: {
      limit: req.query.limit || 0, // FIXIT
      skip: req.query.skip || 0 // FIXIT
    }
  });
  
  const {data, success} = payload;
  
  res.send({
    success,
    data
  });
}

export default getManyUsers;
