import React, {useEffect, useState} from "react";
import cx from 'classnames';
import {connect} from 'react-redux';
import {actions} from '../../state';

const NewDesignForm = (props) => {
  
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  
  useEffect(() => {
    console.log('/NewDesignForm/ -RESPONSE', props.newDesignResponseMessage);
    if (!props.newDesignResponseMessage) return;
    setStatusMessage(props.newDesignResponseMessage);
  },[props.newDesignResponseMessage]);
  
  const addItem = () => {
    console.log('/NewDesignForm/ -addDesign zzz');
    
    if (code.length < 1) { // *** TODO error message!
      console.warn('/NewDesignForm/ -addDesign NO CODE!');
      setStatusMessage('please enter a code');
      return;
    }
    
    props.dispatch(actions.dbCreateDesign({
      friendly_name: name,
      code: `/${code}/`,
    }));
    
    // TODO
  }
  
  // *** clear status message etc
  const onChange = () => {
    setStatusMessage('');
  }
  
  
  return (
      <div className={cx('new-entry-form new-design-form')}>
        <h4>ADD NEW DESIGN</h4>
        
        <div className="form-row">
          <div className="form-group form-group--full-width">
            <input className={cx('input-item input-item--large')}
                   maxLength={64}
                   type="text" placeholder='Name, e.g. Dolly' value={name}
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
                   maxLength={16}
                   type="text" placeholder='Code, e.g. DOL' value={code}
                   onChange= {(e) => {
                     setCode(e.target.value.toUpperCase());
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
  const {newDesignResponseMessage} = state;
  return {newDesignResponseMessage}
};

export default connect(mapStateToProps, null)(NewDesignForm);
