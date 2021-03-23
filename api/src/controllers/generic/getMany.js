
export const getMany = async (req, res, options) => {
  console.log('/getMany/ -getMany');
  
  let data = null;
  //.limit(1)
  try {
    // data = await options.model.find(options.filter);
    // data = await options.model.find(/*{limit: 3}*/).exec();
    
    // FIXIT
    const query = options.model.find({});
    query.limit(options.limit);
    query.skip(options.skip);
    //query.find({ age: { $gt: 50 } });
    // query.find({ limit: '100', skip: '3' })
    // query.find({ full_name: 'Vanessa and Alan' })
    
    data = await query.exec();
    
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
