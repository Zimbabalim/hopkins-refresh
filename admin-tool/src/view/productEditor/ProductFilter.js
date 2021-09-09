import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {actions} from '../../state';


const ProductFilter = (props) => {
  
  const [tag, setTag] = useState('');
  const [design, setDesign] = useState('');
  
  const onSubmitIntention = (key, type) => {
    if (key !== 'Enter') return;
    
    if (type === 'design') {
      setTag('');
      props.dispatch(actions.getProductData(
          {path: `/api/product/?partialmatch=true&friendly_name=${design}`}
      ));
    }
    
    if (type === 'tag') {
      setDesign('');
      props.dispatch(actions.getProductData(
          {path: `/api/product/?partialmatch=true&variations.tags=${tag}`}
      ));
    }
  }
  
  return (
      <>
        <h4>ProductFilter</h4>
        
        <input type="text" placeholder="design" value={design}
               onChange={ e => setDesign(e.target.value) }
               onKeyPress={(e) => {
                 onSubmitIntention(e.key, 'design');
               }}/>
        
        <input type="text" placeholder="tag" value={tag}
               onChange={ e => setTag(e.target.value) }
               onKeyPress={(e) => {
                 onSubmitIntention(e.key, 'tag');
               }}
        />
      </>
  );
};

const mapStateToProps = (state) => {
  console.log('/ProductFilter/ -mapStateToProps', state);
  const {testFlag} = state;
  return {testFlag}
};

export default connect(mapStateToProps, null)(ProductFilter);
