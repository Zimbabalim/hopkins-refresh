
import Design from '../../models/configFragments/Design.model.js';
import finder from '../generic/finder.js';
import methods from '../utils/methods.js';

export const getDesigns = async (req, res) => {
  
  console.log('/getDesigns/ -getDesigns', req.query);
  
   const query = methods.find({
     model: Design,
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

export default getDesigns;
