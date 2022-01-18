import React, {useEffect, useState} from "react";
import cx from 'classnames';
import {connect} from 'react-redux';
import {actions} from '../../state';

const NewUserForm = (props) => {
  
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  
  useEffect(() => {
    console.log('/NewUserForm/ -RESPONSE', props.newUserResponseMessage);
    
    if (!props.newUserResponseMessage) return;
    
    setStatusMessage(props.newUserResponseMessage);
    
  },[props.newUserResponseMessage]);
  
  const addItem = () => {
    console.log('/NewUserForm/ -addItem');
    
    props.dispatch(actions.dbCreateUser({
      full_name: name,
      company,
      email,
    }));
  }
  
  // *** clear status message etc
  const onChange = () => {
    setStatusMessage('');
  }
  
  
  return (
      <div className={cx('new-entry-form new-design-form')}>
        <h4>ADD NEW USER</h4>
        
        <div className="form-row">
          <div className="form-group form-group--full-width">
            <input className={cx('input-item input-item--large')}
                   maxLength={64}
                   type="text" placeholder='name' value={name}
                   onChange= {(e) => {
                     setName(e.target.value);
                     onChange();
                   }}
                   onKeyPress={(e) => {
                     if (e.key !== 'Enter') return;
                     addItem();
                   }}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group form-group--full-width">
            <input className={cx('input-item input-item--large')}
                   maxLength={64}
                   type="text" placeholder='company' value={company}
                   onChange= {(e) => {
                     setCompany(e.target.value);
                     onChange();
                   }}
                   onKeyPress={(e) => {
                     if (e.key !== 'Enter') return;
                     addItem();
                   }}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group form-group--full-width">
            <input className={cx('input-item input-item--large')}
                   maxLength={64}
                   type="text" placeholder='email' value={email}
                   onChange= {(e) => {
                     setEmail(e.target.value);
                     onChange();
                   }}
                   onKeyPress={(e) => {
                     if (e.key !== 'Enter') return;
                     addItem();
                   }}
            />
          </div>
        </div>
        <div className={cx('button-group')}>
          <button
              className={'button'}
              onClick={() => addItem()}
          >ADD</button>
          
          <span className={cx('new-entry-form__status-message')}>{statusMessage}</span>
        </div>
      
      </div>
  );
};

const mapStateToProps = (state) => {
  const {newUserResponseMessage} = state;
  return {newUserResponseMessage}
};

export default connect(mapStateToProps, null)(NewUserForm);
