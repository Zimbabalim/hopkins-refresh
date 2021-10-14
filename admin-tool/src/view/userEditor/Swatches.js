import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import config from '../../config';
import {connect} from 'react-redux';
import utils from '../../utils';

const Swatches = (props) => {
  
  const [swatches, setSwatches] = useState([]);
  
  useEffect(() => {
    
    if (!props.selectedUser) return;
    
    console.log('/Swatches/ ->>>>', props.selectedUser.rich_swatches);
    
    setSwatches(props.selectedUser.rich_swatches);
  
  }, [props.selectedUser]);
  
/*  const getSwatches = () => {
    
    if (!swatches) return <p>no swatches</p>;
    
    swatches.map((item) => {
    
    })
    
  }*/
  
  return (
      <div className={cx('swatches')}>
        {props.selectedUser && props.selectedUser.rich_swatches.map((item) => {
          return (
              <div className={cx('user-swatch')}
              key={utils.uid()}>
                <span className={'user-swatch__code'}>{item.uid}</span>
                <span className={'user-swatch__date'}>{item.pretty_date || ''}</span>
              </div>
          )
        })}
      </div>
  );
};

const mapStateToProps = (state) => {
  const {selectedUser} = state;
  return {selectedUser}
};

export default connect(mapStateToProps, null)(Swatches);
