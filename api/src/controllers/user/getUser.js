import User from '../../models/User.model.js';
import finder from '../generic/finder.js';
import methods from '../utils/methods.js';

export const getUser = async (req, res) => {
  
  const query = methods.findOneById({
    model: User,
    id: req.params.id,
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

export default getUser;
