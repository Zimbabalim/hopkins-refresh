import React from 'react';
import ProductFilter from './ProductFilter';
import {connect} from 'react-redux';
import DesignButton from './DesignButton';
import {actions} from '../../state';
import VariationsList from './VariationsList';

const ProductEditor = (props) => {
  
  const onDesignSelected = (item) => {
    console.log('/ProductEditor/ -onDesignSelected', item);
  
    props.dispatch(actions.designSelected(
        {item}
    ));
  };
  
  return (
      <>
        <ProductFilter />
        <h3>ProductEditor</h3>
        
        <p>Items:</p>
        {props.productData &&
          props.productData.map((item,index) => {
            return <DesignButton
              key={`DesignButton--${index}`}
              data={item}
              clickFn={() => onDesignSelected(item)}
            />
          })
        }
        
        <VariationsList/>
      </>
  );
};

const mapStateToProps = (state) => {
  const {productData} = state;
  console.log('/ProductEditor/ -mapStateToProps', productData);
  return {productData}
};

export default connect(mapStateToProps, null)(ProductEditor);
