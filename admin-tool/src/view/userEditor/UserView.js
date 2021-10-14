import React, {useEffect, useState} from "react";
import cx from 'classnames';
import {connect} from 'react-redux';
import Swatches from './Swatches';
import {actions} from '../../state';

const UserView = (props) => {
  
  const [notes, setNotes] = useState('');
  const [isDirtyData, setIsDirtyData] = useState(false);
  
  useEffect(() => {
    
    if (!props.selectedUser) return;
    
    console.log('/UserView/ -UPDATE?', props.selectedUser.user_notes);
    
    setIsDirtyData(false);
    setNotes(props.selectedUser.user_notes || 'Notes');
    
  }, [props.selectedUser]);
  
  useEffect(() => {
    
    console.log('============ /UserView/ -NOTES:', notes);
    
  }, [notes]);
  
  
  useEffect(() => {
    console.log('/UserView/ -DIRTY xxx', isDirtyData);
  }, [isDirtyData]);
  
  const save = () => {
    console.log('/UserView/ -save xxx');
    const data = Object.assign({}, props.selectedUser);
    
    data.user_notes = notes;
  
    props.dispatch(actions.dbUpdateUser({
      data,
    }));
  }
  
  return (
      <>
        {props.selectedUser && (
            <>
              <div className='variations-list__action-bar' >
                <h2 className='design-title'>{props.selectedUser.full_name}</h2>
                <h3>{props.selectedUser.company}</h3>
                <p><a href={`mailto:${props.selectedUser.email}`}>{props.selectedUser.email}</a></p>
                <div className={cx('button-group')}>
                  <button className={cx('button', (!isDirtyData) ? 'button--is-disabled' : null)}
                      onClick={() => save()}>SAVE CHANGES</button>
                  <button className={cx('button')}
                      /*onClick={() => deleteDesign()}*/>DELETE USER</button>
                </div>
              </div>
              
              <textarea className={cx('text-area user-notes')} value={notes} onChange={(e) => {
                setNotes(e.target.value);
                setIsDirtyData(true);
              }}/>
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

export default connect(mapStateToProps, null)(UserView);
