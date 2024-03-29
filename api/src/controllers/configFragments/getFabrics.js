
import Fabric from '../../models/configFragments/Fabric.model.js';
import finder from '../generic/finder.js';
import methods from '../utils/methods.js';

export const getFabrics = async (req, res) => {
  
  console.log('/getFabrics/ -getFabrics', req.query);
  
  const query = methods.find({
    model: Fabric,
    filters: req.query,
  });
  
  let payload = await finder(req, res, {
    query
  });
  
  const {data, success} = payload;
  
  const sortedData = data.sort((a, b) => a.code.localeCompare(b.code)); // *** alpha
  
  res.send({
    success,
    data: sortedData,
  });
}

export default getFabrics;
