import React, {useEffect} from "react";
import cx from 'classnames';
import {connect} from 'react-redux';
import {actions} from '../state';
import config from '../config';

const NavigationBar = (props) => {
  
  useEffect(() => {
    console.log('/NavigationBar/ -INDEX', props.currentViewIndex);
  }, [props.currentViewIndex]);
  
  const setIndex = (index) => {
    console.log('/NavigationBar/ -setIndex', index);
  
    props.dispatch(actions.changeRoute(
        {index}
    ));
  }
  
  return (
      <div className={'navigation-bar'}>
        <span className={cx('navigation-link', (props.currentViewIndex === 0) ? 'is-selected' : null )}
              onClick={() => setIndex(0)}
        >USER EDITOR</span>
        <span className={cx('navigation-link', (props.currentViewIndex === 1) ? 'is-selected' : null )}
              onClick={() => setIndex(1)}
        >PRODUCT EDITOR</span>
        <span className={cx('navigation-link', (props.currentViewIndex === 2) ? 'is-selected' : null )}
              onClick={() => setIndex(2)}
        >SUNDRIES EDITOR</span>
      </div>
  );
};

const mapStateToProps = (state) => {
  const {currentViewIndex} = state;
  return {currentViewIndex}
};

export default connect(mapStateToProps, null)(NavigationBar);
