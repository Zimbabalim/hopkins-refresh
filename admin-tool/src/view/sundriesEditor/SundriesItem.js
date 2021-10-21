import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import config from '../../config';
import {connect} from 'react-redux';
import utils from '../../utils';

const SundriesItem = (props) => {
  
  const [isSelected, setIsSelected] = useState(false);
  
  /*useEffect(() => {
    
    if (!props.selectedDesign) {
      setIsSelected(false);
      return
    }
    console.log('/SundriesItem/ -A', props.data._id === props.selectedDesign._id);
    setIsSelected( props.data._id === props.selectedDesign._id);
    
  }, [props.selectedDesign]);*/
  
  return (
      <div className={cx('sundries-item')}>
        <div className={'sundries-item__inner'}>
          <div className={cx('sundries-item__images')}>
            {props.data.images.map((item,index) => {
              return (
                  <img src={`${config.api.sundriesImagesPath}/${item}`} key={utils.uid()}/>
              )
            })
            }
          </div>
          <div className={'sundries-item__body'}>
            <h4 className={'sundries-item__title'}>{props.data.headline}<span>{props.data.date}</span></h4>
            <p className={'sundries-item__copy'}>{props.data.copy}</p>
          
          </div>
        </div>
        
        {/*<div className='variations-item__action-bar'>
            <div className={cx('button-group')}>
              <button className={cx('button')}>DELETE</button>
            </div>
          </div>*/}
      </div>
  );
};

const mapStateToProps = (state) => {
  const {} = state;
  return {}
};

export default connect(mapStateToProps, null)(SundriesItem);
