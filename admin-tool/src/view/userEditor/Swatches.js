import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import utils from '../../utils';
import cx from 'classnames';

const Swatches = (props) => {
  
  const [swatches, setSwatches] = useState([]);
  const [markedSwatches, setMarkedSwatches] = useState([]);
  
  useEffect(() => {
    
    if (!props.selectedUser) return;
    
    console.log('/Swatches/ ->>>>', props.selectedUser.rich_swatches);
    
    const tempMarked = [];
    props.selectedUser.rich_swatches.map((item) => {
      tempMarked.push(item.cms_marked === '1'); // *** convert to bools
    });
    
    setMarkedSwatches(tempMarked);
    setSwatches(props.selectedUser.rich_swatches);
    
    console.log('/Swatches/ -MARKED', markedSwatches);
    
  }, [props.selectedUser]);
  
  
  const toggleSwatchMark = (index) => {
    const temp = [...markedSwatches];
    temp[index] = !temp[index];
    setMarkedSwatches(temp);

    const clone = [...props.selectedUser.rich_swatches];
    
    clone.map((item, index) => {
      return item.cms_marked = (temp[index] === true) ? '1' : '0';
    });
    
    props.onChange(clone);
  }
  
  return (
      <div className={cx('swatches')}>
        {swatches.map((item, index) => {
          return (
              <div className={cx('user-swatch',
                  (markedSwatches[index] === true) ? 'user-swatch--marked' : 'null')}
                   key={utils.uid()}
                   onClick={() => {
                     console.log('/Swatches/ -CLICK', index);
                     toggleSwatchMark(index);
                   }}
              >
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
