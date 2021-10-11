import React from "react";
import cx from 'classnames';

const NewDesignForm = () => {
  return (
      <div className={cx('new-entry-form new-design-form')}>
        <h4>ADD NEW USER</h4>
        
        <div className="form-row">
          <div className="form-group form-group--full-width">
            <input className={cx('input-item input-item--large')}
                   maxLength={32}
                   type="text" placeholder='name' value=''
                   onChange= {(e) => {
                     // setIsDirtyData(true);
                     // options.change(e.target.value);
                   }}
                // onKeyPress={options.click}
            />
          </div>
        </div>
  
        <div className="form-row">
          <div className="form-group form-group--full-width">
            <input className={cx('input-item input-item--large')}
                   maxLength={32}
                   type="text" placeholder='company' value=''
                   onChange= {(e) => {
                     // setIsDirtyData(true);
                     // options.change(e.target.value);
                   }}
                // onKeyPress={options.click}
            />
          </div>
        </div>
  
        <div className="form-row">
          <div className="form-group form-group--full-width">
            <input className={cx('input-item input-item--large')}
                   maxLength={32}
                   type="text" placeholder='email' value=''
                   onChange= {(e) => {
                     // setIsDirtyData(true);
                     // options.change(e.target.value);
                   }}
                // onKeyPress={options.click}
            />
          </div>
        </div>
        
        <button className={'button'}>ADD</button>
      
      </div>
  );
};

export default NewDesignForm;
