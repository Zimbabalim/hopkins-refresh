import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import config from '../../config';
import {connect} from 'react-redux';

const DesignButton = (props) => {
  
  const [isSelected, setIsSelected] = useState(false);
  
  useEffect(() => {
    
    if (!props.selectedDesign) {
      setIsSelected(false);
      return
    }
    // console.log('/DesignButton/ -A', props.data._id === props.selectedDesign._id);
    setIsSelected( props.data._id === props.selectedDesign._id);
  
  }, [props.selectedDesign]);
  //(props.data._id === props.selectedDesign._id) ? 'design-button--is-selected' : null
  return (
      <div className={cx('design-button', (isSelected) ? 'design-button--is-selected' : null )}
           onClick={() => props.clickFn(props.data)}
      >
        <div className={cx('design-button__inner')}>
          {/*<img src={`${config.api.imagesPath}/A/${fabricCode}-${designCode}-${colourCode}_a.jpg?cb=${trigger}`} alt={`image A$`}/>*/}
          <h4 className={cx('design-button__label')}>{props.data.friendly_name}</h4>
        </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  const {selectedDesign} = state;
  return {selectedDesign}
};

export default connect(mapStateToProps, null)(DesignButton);
