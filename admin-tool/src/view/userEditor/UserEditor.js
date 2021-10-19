import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {actions} from '../../state';
import NewUserForm from './NewUserForm';
import UserFilter from './UserFilter';
import UserView from './UserView';
import UserButton from './UserButton';
import cx from 'classnames';


const UserEditor = (props) => {
  
  // *** TODO paginate results
  
  useEffect(() => {
    
    if (!props.userData) return;
    
    if (props.userData.length === 1) {
      console.log('/UserEditor/ -AUTO CLICK xxx');
      onSelection(props.userData[0]);
    }
    
  }, [props.userData])
  
  const onSelection = (item) => {
    props.dispatch(actions.userSelected(
        {item}
    ));
  };
  
  return (
      <div className={cx('view editor-window user-editor',
          (props.currentViewIndex === props.routeIndex) ? 'is-active' : null )}>
  
        <div className="editor-window__pane--left">
          
          <NewUserForm/>
          
          {props.userData &&
          props.userData.map((item,index) => {
            return <UserButton
                key={`DesignButton--${index}`}
                data={item}
                clickFn={() => onSelection(item)}
            />
          })
          }
        </div>
  
        <div className="editor-window__pane--right">
          <UserFilter/>
          <UserView/>
        </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  const {userData, currentViewIndex} = state;
  return {userData, currentViewIndex}
};

export default connect(mapStateToProps, null)(UserEditor);
