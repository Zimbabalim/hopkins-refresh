import React, {useEffect, useState} from 'react';
import {actions} from '../../state';
import {connect} from 'react-redux';
import cx from 'classnames';
import config from '../../config';
import SundriesItem from './SundriesItem';
import utils from '../../utils';
import BlankSundriesItem from './BlankSundriesItem';

const SundriesEditor = (props) => {
  
  const [sundriesItems, setSundriesItems] = useState([]);
  const [newPost, setNewPost] = useState(null);
  
  useEffect(() => {
    console.log('/SundriesEditor/ -====================', props.currentViewIndex, props.routeIndex);
  }, [props.currentViewIndex]);
  
  useEffect(() => {
    props.dispatch(actions.getSundriesData(
        {path: `${config.api.getSundries}`}
    ));
  }, []);
  
  useEffect(() => {
    
    if (!props.sundriesData) return;
    
    setSundriesItems(props.sundriesData.reverse());
    setNewPost(null);
    
  }, [props.sundriesData]);
  
  
  const addNew = () => {
    console.log('/SundriesEditor/ -addNew');
    
    const blank = {
      headline: 'xxx',
      copy: 'xxx',
      date: 'xxx',
      images: [],
    }
    
    const newItem = ()  => {
      return (
          <BlankSundriesItem
              key={utils.uid() }
              data={blank}
              deleteFn={() => deleteNewPost()}
          />
      )
    }
    setNewPost(newItem());
  }
  
  const deleteNewPost = () => {
    console.log('/SundriesEditor/ -deleteNewPost xxxxx');
    setNewPost(null);
  }
  
  
  
  return (
      <div className={cx('view editor-window sundries-editor',
          (props.currentViewIndex === props.routeIndex) ? 'is-active' : null)}>
        
        <div className="editor-window__pane--left">
        
        </div>
        
        <div className="editor-window__pane--right">
          
          <div className='variations-list__action-bar'>
            <h2>Sundries</h2>
            <div className={cx('button-group')}>
              <button className={cx('button')}
                      onClick={() => addNew()}
              >ADD NEW POST</button>
            </div>
          </div>
          
          {/*{props.sundriesData &&
          props.sundriesData.map((item,index) => {
            return <SundriesItem data={item} key={utils.uid()}/>
          })
          }*/}
  
          {newPost}
          
          {sundriesItems.map((item,index) => {
            return <SundriesItem data={item} key={utils.uid()}/>
          })
          }
        </div>
      
      
      </div>
  );
};

const mapStateToProps = (state) => {
  const {sundriesData, currentViewIndex} = state;
  return {sundriesData, currentViewIndex}
  return {}
};

export default connect(mapStateToProps, null)(SundriesEditor);
