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
        <h4 className={'filter-title'}>Find products
          {props.productData && (<span className={'filter-title__item-count'}>{props.productData.length} results</span>)}
        </h4>
        
        <div className="form-row">
          <div className="form-group form-group--full-width">
            
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
  const {productData} = state;
  return {productData}
};

export default connect(mapStateToProps, null)(ProductFilter);
