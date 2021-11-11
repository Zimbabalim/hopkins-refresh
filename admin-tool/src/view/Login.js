import React, {useState} from "react";
import cx from 'classnames';
import {actions} from '../state';
import {connect} from 'react-redux';

const Login = (props) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [success, setSuccess] = useState(false);
  
  
  const onSubmit = () => {
    console.log('/Login/ -onSubmit', username, password);
    
    // TODO retrieve from db!
    if (username === 'loz' && password === '83fortess') {
      setStatusMessage('woot!');
      setSuccess(true);
      setTimeout(() => {
        props.dispatch(actions.loginSubmit({
          success: true,
        }));
      }, 999);
    } else {
      setStatusMessage('nope...');
    }
  }
  
  const onChange = () => {
    setStatusMessage('');
  }
  
  return (
      <div className={cx('login')}>
        
        <div className={cx('new-entry-form login-form', (success ? 'login-form--success' : null))}>
          <h4>Hopkins admin tool v2</h4>
    
          <div className="form-row">
            <div className="form-group form-group--full-width">
              <input className={cx('input-item input-item--large')}
                     maxLength={64}
                     type="text" placeholder='Username' value={username}
                     onChange= {(e) => {
                       setUsername(e.target.value);
                       onChange();
                     }}
                     onKeyPress={(e) => {
                       if (e.key !== 'Enter') return;
                       onSubmit();
                     }}
              />
            </div>
          </div>
  
          <div className="form-row">
            <div className="form-group form-group--full-width">
              <input className={cx('input-item input-item--large')}
                     maxLength={64}
                     type="password" placeholder='Password' value={password}
                     onChange= {(e) => {
                       setPassword(e.target.value);
                       onChange();
                     }}
                     onKeyPress={(e) => {
                       if (e.key !== 'Enter') return;
                       onSubmit();
                     }}
              />
            </div>
          </div>
    
          
    
    
          <div className={cx('button-group')}>
            <button
                className={'button'}
                onClick={() => onSubmit()}
            >LOGIN</button>
      
            <span className={cx('new-entry-form__status-message')}>{statusMessage}</span>
          </div>
  
        </div>
        
        
      </div>
  );
};


const mapStateToProps = (state) => {
  const {} = state;
  return {}
};

export default connect(mapStateToProps, null)(Login);
