
// import Sundry from '../../models/Sundries.model.js';
import Colour from '../../models/configFragments/Colour.model.js';
import finder from '../generic/finder.js';
import methods from '../utils/methods.js';

export const getColours = async (req, res) => {
  
  console.log('/getColours/ -getColours', req.query);
  
   const query = methods.find({
     model: Colour,
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

export default getColours;
