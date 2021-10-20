
import Sundry from '../../models/Sundries.model.js';
import finder from '../generic/finder.js';
import methods from '../utils/methods.js';

export const getSundries = async (req, res) => {
  
  console.log('/getSundries/ -getSundries', req.query);
  
   const query = methods.find({
     model: Sundry,
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

export default getSundries;
