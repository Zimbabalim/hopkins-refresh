
export const getMany = async (req, res, options) => {
  // console.log('================= /getMany/ -getMany', options.filter);
  
  let data = null;
  //.limit(1)
  try {
    // data = await options.model.find(options.filter);
    // data = await options.model.find(/*{limit: 3}*/).exec();
    
    // FIXIT
    // const query = options.model.find({});
    // query.limit(parseInt(options.filter.limit));
    // query.skip(parseInt(options.filter.skip));
    // query.limit(1);
    // query.skip(1);
    
    //query.find({ age: { $gt: 50 } });
    // query.find({ limit: 1, skip: 0 })
    // query.find({ full_name: 'Vanessa and Alan' })
    
    
    
    // data = await query.exec();
    data = await options.query.exec();
    
  } catch (error) {
    console.error('/getMany/ -getMany', error);
    res.status(500).send({
      message: options.error || 'Borked on the inside',
      success: false
    });
    return {
      success: false
    }
  }
  return {
    data,
    success: true
  };
}

export default getMany;
