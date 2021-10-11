import React, {useEffect} from 'react';
import ProductFilter from './ProductFilter';
import {connect} from 'react-redux';
import DesignButton from './DesignButton';
import {actions} from '../../state';
import VariationsList from './VariationsList';
import ImageUploader from './ImageUploader';
import NewDesignForm from './NewDesignForm';

const ProductEditor = (props) => {
  
  // *** TODO paginate results
  
  useEffect(() => {
    
    if (!props.productData) return;
    
    if (props.productData.length === 1) {
      console.log('/ProductEditor/ -AUTO CLICK');
      onDesignSelected(props.productData[0]);
    }
    
  }, [props.productData])
  
  const onDesignSelected = (item) => {
    // console.log('/ProductEditor/ -onDesignSelected', item);
  
    props.dispatch(actions.designSelected(
        {item}
    ));
  };
  
  return (
      <div className='editor-window'>
  
        <ImageUploader/>
  
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
          <VariationsList/>
        </div>
        
        
      </div>
  );
};

const mapStateToProps = (state) => {
  const {productData} = state;
  return {productData}
};

export default connect(mapStateToProps, null)(ProductEditor);
