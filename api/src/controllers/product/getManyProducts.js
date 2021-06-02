
import User from '../../models/User.model.js';
import Product from '../../models/Product.model.js';
import finder from '../generic/finder.js';
import methods from '../utils/methods.js';

export const getManyProducts = async (req, res) => {
  
  const query = methods.find({
    model: Product,
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

export default getManyProducts;
