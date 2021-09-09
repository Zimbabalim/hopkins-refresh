const methods = {
  
  props: {
    queryDelimiter: '&',
    keyValueSeparator: '='
  },
  
  
  castNumericValues: (filters) => {
    Object.keys(filters).map((key) => {
      let value = filters[key];
      const asNumber = parseFloat(value, 10);
      value = (Number.isNaN(asNumber)) ? value : asNumber; // *** output as number or string
      filters[key] = value;
    });
    return filters;
  },
  
  //
  find: (options) => {
    const params = methods.castNumericValues(options.filters);
    const query = options.model.find({});
    const partialmatch = (params.partialmatch === 'true');
    const all = (params.all === 'true');
    
    console.log('/methods/ -find', all);
    
    query.limit(params.limit || 0);
    query.skip(params.skip || 0);
    
    // *** remove these so we can just iterate the remaining data
    delete params.limit;
    delete params.skip;
    delete params.partialmatch;
    delete params.all;
    
    Object.keys(params).map((key) => {
      let value = params[key];
      
      /*if (partialmatch) { // *** WORKS
        query.find({[key]: {"$regex": value, "$options": "i" }});
      } else {
        query.find({[key]: value});
      }*/
  
      if (partialmatch) { // *** WORKS
        console.log('/methods/ -FIND');
        query.find({[key]: {"$regex": value, "$options": "i" }});
        return;
      }
      console.log('/methods/ -FALL THRU?');
  
      // *** TODO accept multiple tags, doesn't seem to be working
      if (all) {
        const valueToArray = value.split(',');
        console.log('/methods/ -ALL =================', valueToArray);
        query.find({[key]: {"$all": valueToArray }});
        
        //find().all(function(arr)
        /*query.find().all((z) => {
          console.log('/methods/ -', z);
        })*/
        return;
      }
  
      query.find({[key]: value});
  
      // *** TODO refactor - switch statement?
      /*if (all) {
        
        console.log('/methods/ -ALL =================');
        
        const valueToArray = value.split(',');
        console.log('/methods/ -valueToArray', valueToArray);
        
        query.find({[key]: {"$all": valueToArray, "$options": "i" }});
      } else {
        query.find({[key]: value});
      }*/
    })
    
    return query;
  },
  
  findOneById: (options) => {
    // TODO: mongoose.Types.ObjectId.isValid(id);
    // FIXIT throws Cannot set headers after they are sent to the client error on error
    return options.model.findOne({_id: options.id});
  },
  
  createNewItem: (options) => {
  
  },
  
}



export default methods;
