
import User from '../../models/User.model.js';
import Product from '../../models/Product.model.js';
import finder from '../generic/finder.js';
import methods from '../utils/methods.js';

export const getManyProducts = async (req, res) => {
  
  console.log('/getManyProducts/ -getManyProducts', req.query.friendly_name);
  
  // let payload = {};
  
  const isQueryForMain = Object.keys(req.query).filter((item) => {
    return item === 'friendly_name';
  });
  
  
/*  const queryMain = async () => {
  
    let query = {};
    let payload = {};
    
    console.log('/getManyProducts/ -queryMain');
    query = methods.find({
      model: Product,
      filters: req.query,
    });
    
    payload = await finder(req, res, {
      query
    });
    
    const {data, success} = payload;
    
    res.send({
      success,
      data
    });
  }*/
  
  if (isQueryForMain.length === 0) {
    await queryMain();
  }
  
  
  // *** this works
  /* const query = methods.find({
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
   });*/
  
  
  // parse query (as per users?)
  // query is for design or pattern (main or variation)?
  // ---
  // find design that includes variations(s) that match query
  
  // friendly_name finds main!
  //
  
  
  
}

export default getManyProducts;
