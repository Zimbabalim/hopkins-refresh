import React, {useEffect} from 'react';
import ProductFilter from './ProductFilter';
import {connect} from 'react-redux';
import DesignButton from './DesignButton';
import {actions} from '../../state';
import VariationsList from './VariationsList';
import ImageUploader from './ImageUploader';
import NewDesignForm from './NewDesignForm';
import cx from 'classnames';
import config from '../../config';
import NewFragmentForm from './NewFragmentForm';

const ProductEditor = (props) => {
  
  // *** TODO paginate results
  
  useEffect(() => {
    console.log('/ProductEditor/ -====================', props.currentViewIndex, props.routeIndex);
  }, [props.currentViewIndex]);
  
  useEffect(() => {
    
    if (!props.productData) return;
    
    console.log('===== /ProductEditor/ -NEW DATA, auto?', props.autoDesignQuery);
    if (props.productData.length === 1) {
      console.log('/ProductEditor/ -AUTO CLICK');
      onDesignSelected(props.productData[0]); // FIXIT - ropey
    }
    
  }, [props.productData])
  
  const onDesignSelected = (item) => {
    props.dispatch(actions.designSelected(
        {item}
    ));
    
    // *** config fragments
    /*props.dispatch(actions.GET_CONFIG_DESIGNS_DATA({
      path: `${config.api.getConfigDesigns}`
    }));*/
  };
  //props.currentViewIndex, props.routeIndex
  return (
      <div className={cx('view editor-window product-editor',
          (props.currentViewIndex === props.routeIndex) ? 'is-active' : null)}>
  
        {/*<ImageUploader/>*/}
  
        <div className="editor-window__pane--left">
          
          <NewDesignForm/>
          
          {props.productData &&
          props.productData.map((item,index) => {
            return <DesignButton
                key={`DesignButton--${index}`}
                data={item}
                clickFn={() => onDesignSelected(item)}
            />
          })
          }
        </div>
  
        <div className="editor-window__pane--right">
          <ProductFilter/>
          {/* FIXIT, layout breaks when moving image uploader to here on smaller viewport  */}
          <ImageUploader/>
          <NewFragmentForm/>
          <VariationsList/>
          
          
          
          
        </div>
        
        
      </div>
  );
};

const mapStateToProps = (state) => {
  const {productData, currentViewIndex, autoDesignQuery} = state;
  return {productData, currentViewIndex, autoDesignQuery}
};

export default connect(mapStateToProps, null)(ProductEditor);
