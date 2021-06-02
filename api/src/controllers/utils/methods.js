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
    
    query.limit(params.limit || 0);
    query.skip(params.skip || 0);
    
    // *** remove these so we can just iterate the remaining data
    delete params.limit;
    delete params.skip;
    delete params.partialmatch;
    
    Object.keys(params).map((key) => {
      let value = params[key];
      if (partialmatch) {
        query.find({[key]: {"$regex": value, "$options": "i" }});
      } else {
        query.find({[key]: value});
      }
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
