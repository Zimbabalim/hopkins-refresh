const methods = {
  
  props: {
    queryDelimiter: '&',
    keyValueSeparator: '='
  },
  
  
  parseQueryParams: (filters) => {
    
    Object.keys(filters).map((key) => {
      let value = filters[key];
  
      const asNumber = parseFloat(value, 10);
      value = (Number.isNaN(asNumber)) ? value : asNumber; // *** output as number or string
  
      filters[key] = value;
    });
    console.log('/methods/ -parseQueryParams',filters);
    return filters;
  },
  
  // partialmatch:false
  decorateQuery: (action, model, filters) => {
    console.log('/methods/ -decorateQuery x', action, model, filters);
  
    const params = methods.parseQueryParams(filters);
    const query = model[action]({});
    const partialmatch = (params.partialmatch === 'true');
    
    query.limit(params.limit || 0);
    query.skip(params.skip || 0);
    
    // *** remove these so we can just worry about the rest if present
    delete params.limit;
    delete params.skip;
    delete params.partialmatch;
    
    Object.keys(params).map((key) => {
      
      console.log('/methods/ -');
  
      let value = params[key];

      if (partialmatch) {
        query.find({[key]: {"$regex": value, "$options": "i" }});
      } else {
        query.find({[key]: value});
      }
    })
    
    //query.find({ full_name: 'Vanessa and Alan' })
    
    console.log('/methods/ -decorateQuery', params);
  
  
    //const { [removeProp]: remove, ...rest } = data;
    
    
    // TODO others
    
    return query;
  }
}

export default methods;
