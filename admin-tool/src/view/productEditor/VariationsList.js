import React from "react";
import {connect} from 'react-redux';
import VariationsItem from './VariationsItem';

const VariationsList = (props) => {
  return (
      <>
        <h4>Variations:</h4>
        {props.selectedDesign &&
          props.selectedDesign.variations.map((item, index) => {
            return <VariationsItem
              key={`VariationsItem--${index}`}
              data={item}
              />
          })
        }
      </>
  );
};

const mapStateToProps = (state) => {
  const {selectedDesign} = state;
  console.log('/VariationsList/ -mapStateToProps', selectedDesign);
  return {selectedDesign}
};

export default connect(mapStateToProps, null)(VariationsList);
