import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {actions} from '../../state';
import config from '../../config';
import cx from 'classnames';

const ProductFilter = (props) => {
  
  const [tag, setTag] = useState('');
  const [design, setDesign] = useState(''); // FIXIT
  
  const onSubmitIntention = (key, type) => {
    if (key !== 'Enter') return;
    
    //console.log('/ProductFilter/ -onSubmitIntention', config);
    
    if (type === 'design') {
      setTag('');
      props.dispatch(actions.getProductData(
          {type, path: `${config.api.getProductByName}${design}`}
      ));
    }
    
    if (type === 'tag') {
      setDesign('');
      props.dispatch(actions.getProductData(
          {type, path: `${config.api.getProductByTags}${tag}`}
      ));
    }
  }
  
  return (
      <div className={cx('product-filter')}>
        <h4>ProductFilter</h4>
        
        <div className="form-row">
          <div className="form-group">
            
            <input className={cx('input-item', 'input-item--large')}
                   type="text" placeholder="design" value={design}
                   onChange={ e => setDesign(e.target.value) }
                   onKeyPress={(e) => {
                     onSubmitIntention(e.key, 'design');
                   }}/>
            
            <input className={cx('input-item', 'input-item--large')}
                   type="text" placeholder="tag" value={tag}
                   onChange={ e => setTag(e.target.value) }
                   onKeyPress={(e) => {
                     onSubmitIntention(e.key, 'tag');
                   }}
            />
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  //console.log('/ProductFilter/ -mapStateToProps', state);
  const {testFlag} = state;
  return {testFlag}
};

export default connect(mapStateToProps, null)(ProductFilter);
