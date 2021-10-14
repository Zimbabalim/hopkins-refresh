import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {actions} from '../../state';
import config from '../../config';
import cx from 'classnames';

const UserFilter = (props) => {
  
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  
  const onSubmitIntention = (key, type) => {
    if (key !== 'Enter') return;
    
    //console.log('/UserFilter/ -onSubmitIntention', config);
  
    if (type === 'name') {
      setCompany('');
      setEmail('');
      props.dispatch(actions.getUserData(
          {type, path: `${config.api.getUser}full_name=${name}`}
      ));
    }
    
    if (type === 'company') {
      setName('');
      setEmail('');
      props.dispatch(actions.getUserData(
          {type, path: `${config.api.getUser}company=${company}`}
      ));
    }
  
    if (type === 'email') {
      setName('');
      setCompany('');
      props.dispatch(actions.getUserData(
          {type, path: `${config.api.getUser}email=${email}`}
      ));
    }
    
    
  }
  
  return (
      <div className={cx('product-filter')}>
        <h4 className={'filter-title'}>Find users
          {props.userData && (<span className={'filter-title__item-count'}>{props.userData.length} results</span>)}
        </h4>
        
        <div className="form-row">
          <div className="form-group form-group--full-width">
            
            <input className={cx('input-item', 'input-item--large')}
                   type="text" placeholder="name" value={name}
                   onChange={ e => setName(e.target.value) }
                   onKeyPress={(e) => {
                     onSubmitIntention(e.key, 'name');
                   }}/>
            
            <input className={cx('input-item', 'input-item--large')}
                   type="text" placeholder="company" value={company}
                   onChange={ e => setCompany(e.target.value) }
                   onKeyPress={(e) => {
                     onSubmitIntention(e.key, 'company');
                   }}
            />
  
            <input className={cx('input-item', 'input-item--large')}
                   type="text" placeholder="email" value={email}
                   onChange={ e => setEmail(e.target.value) }
                   onKeyPress={(e) => {
                     onSubmitIntention(e.key, 'email');
                   }}
            />
            
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  const {userData} = state;
  return {userData};
};

export default connect(mapStateToProps, null)(UserFilter);
