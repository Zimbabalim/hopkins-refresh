import React, {useEffect} from 'react';
import {actions} from '../../state';
import {connect} from 'react-redux';
// import ProductFilter from './ProductFilter';
// import DesignButton from './DesignButton';
// import VariationsList from './VariationsList';
// import ImageUploader from './ImageUploader';
// import NewDesignForm from './NewDesignForm';
import cx from 'classnames';
import config from '../../config';
import DesignButton from '../productEditor/DesignButton';
import SundriesItem from './SundriesItem';
import utils from '../../utils';

const SundriesEditor = (props) => {
  
  // *** TODO paginate results
  
  useEffect(() => {
    console.log('/SundriesEditor/ -====================', props.currentViewIndex, props.routeIndex);
  }, [props.currentViewIndex]);
  
  useEffect(() => {
    props.dispatch(actions.getSundriesData(
        {path: `${config.api.getSundries}`}
    ));
  }, []);
  
  /*useEffect(() => {
    
    if (!props.productData) return;
    
    if (props.productData.length === 1) {
      console.log('/SundriesEditor/ -AUTO CLICK');
      onDesignSelected(props.productData[0]);
    }
    
  }, [props.productData])*/
  
  
  return (
      <div className={cx('view editor-window sundries-editor',
          (props.currentViewIndex === props.routeIndex) ? 'is-active' : null)}>
        
        <div className="editor-window__pane--left">

        </div>
  
        <div className="editor-window__pane--right">
  
          <div className='variations-list__action-bar'>
            <h2>Sundries</h2>
            <div className={cx('button-group')}>
              <button className={cx('button')}
                      >ADD NEW POST</button>
            </div>
          </div>
          
          
          {props.sundriesData &&
          props.sundriesData.map((item,index) => {
            return <SundriesItem data={item} key={utils.uid()}/>
          })
          }
        </div>
        
        
      </div>
  );
};

const mapStateToProps = (state) => {
  const {sundriesData, currentViewIndex} = state;
  return {sundriesData, currentViewIndex}
  return {}
};

export default connect(mapStateToProps, null)(SundriesEditor);
