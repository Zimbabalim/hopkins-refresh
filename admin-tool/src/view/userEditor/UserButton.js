import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import config from '../../config';
import {connect} from 'react-redux';

const DesignButton = (props) => {
  
  const [isSelected, setIsSelected] = useState(false);
  
  useEffect(() => {
    if (!props.selectedUser) {
      setIsSelected(false);
      return
    }
    
    setIsSelected( props.data._id === props.selectedUser._id);
  }, [props.selectedUser]);

  return (
      <div className={cx('design-button', (isSelected) ? 'design-button--is-selected' : null )}
           onClick={() => props.clickFn(props.data)}
      >
        <div className={cx('design-button__inner')}>
          <h4 className={cx('design-button__label')}>{props.data.full_name}</h4>
        </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  const {selectedUser} = state;
  return {selectedUser}
};

export default connect(mapStateToProps, null)(DesignButton);
