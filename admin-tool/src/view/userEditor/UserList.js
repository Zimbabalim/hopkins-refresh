import React, {useEffect, useState} from "react";
import cx from 'classnames';
import {connect} from 'react-redux';
import Swatches from './Swatches';

const UserList = (props) => {
  
  const [notes, setNotes] = useState('');
  
  useEffect(() => {
    
    if (!props.selectedUser) {
      setNotes('');
      return;
    }
    
    setNotes(props.selectedUser.user_notes || '');
    
  }, [props.selectedUser]);
  
  return (
      <>
        {props.selectedUser && (
            <>
              <div className='variations-list__action-bar' >
                <h2 className='design-title'>{props.selectedUser.full_name}</h2>
                <h3>{props.selectedUser.company}</h3>
                <p><a href={`mailto:${props.selectedUser.email}`}>{props.selectedUser.email}</a></p>
                <div className={cx('button-group')}>
                  <button className={cx('button')}
                      /*onClick={() => deleteDesign()}*/>DELETE USER</button>
                </div>
              </div>
              
              <textarea className={cx('text-area user-notes')} defaultValue={notes}/>
              <Swatches />
            </>
        )}
      </>
  );
};

const mapStateToProps = (state) => {
  const {selectedUser} = state;
  return {selectedUser}
};

export default connect(mapStateToProps, null)(UserList);
