
import User from '../../models/User.model.js';
import Product from '../../models/Product.model.js';
import finder from '../generic/finder.js';
import methods from '../utils/methods.js';

// import Design from '../../models/configFragments/Design.model.js'; // TEST

export const getManyProducts = async (req, res) => {
  
  console.log('/getManyProducts/ -getManyProducts', req.query);
  
   const query = methods.find({
     model: Product,
     filters: req.query,
   });
  
/*  const query2 = methods.find({
    model: Design,
    filters: {},
  });
  console.log('============ /getManyProducts/ -getManyProducts', query2);*/
   
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
