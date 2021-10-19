import React, {useEffect, useState} from "react";
import cx from 'classnames';
import {connect} from 'react-redux';
import Swatches from './Swatches';
import {actions} from '../../state';

const UserView = (props) => {
  
  const [isDirtyData, setIsDirtyData] = useState(false);
  const [notes, setNotes] = useState('');
  const [swatches, setSwatches] = useState([]);
  
  useEffect(() => {
    
    if (!props.selectedUser) return;
    
    setIsDirtyData(false);
    setNotes(props.selectedUser.user_notes || 'Notes');
    
  }, [props.selectedUser]);
  
  
  useEffect(() => {
    console.log('/UserView/ -DIRTY', isDirtyData);
  }, [isDirtyData]);
  
  
  const save = () => {

    const data = Object.assign({}, props.selectedUser);
    data.user_notes = notes;
    data.rich_swatches = swatches;
  
    props.dispatch(actions.dbUpdateUser({
      data,
    }));
    
    setIsDirtyData(false);
  }
  
  const onSwatchMarkingChanged = (swatches) => {
    setSwatches(swatches);
    setIsDirtyData(true);
  }
  
  const deleteUser = () => {
    const id = props.selectedUser._id;
    console.log('/UserView/ -deleteUser', id);
  
    props.dispatch(actions.dbDeleteUser({
      id,
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
                      onClick={() => deleteUser()}>DELETE USER</button>
                </div>
              </div>
              
              <textarea className={cx('text-area user-notes')} value={notes} onChange={(e) => {
                setNotes(e.target.value);
                setIsDirtyData(true);
              }}/>
              <Swatches
                onChange={onSwatchMarkingChanged}
              />
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
