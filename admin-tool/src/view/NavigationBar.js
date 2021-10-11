import React from "react";
import cx from 'classnames';

const NavigationBar = () => {
  return (
      <div className={'navigation-bar'}>
        <span className={cx('navigation-link')}>USER EDITOR</span>
        <span className={cx('navigation-link')}>PRODUCT EDITOR</span>
        <span className={cx('navigation-link')}>SUNDRIES EDITOR</span>
      </div>
  );
};

export default NavigationBar;
