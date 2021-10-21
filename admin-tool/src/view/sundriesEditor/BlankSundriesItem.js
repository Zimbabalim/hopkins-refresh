import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import config from '../../config';
import {connect} from 'react-redux';
import utils from '../../utils';
import {actions} from '../../state';

const BlankSundriesItem = (props) => {
  
  const [headline, setHeadline] = useState('');
  const [copy, setCopy] = useState('');
  const [images, setImages] = useState([]);
  const [trigger, setTrigger] = useState(false); // *** image cache buster
  
  useEffect(() => {
    console.log('/BlankSundriesItem/ -TRIGGER', props.imagesUploaderTrigger);
    
    setTrigger(utils.uid());
    
  }, [props.imagesUploaderTrigger]);
  
  
  const upload = (files, directory = 'sundries') => {
    
    console.log('/ImageUploader/ -upload', files, files[0].name);
    
    const formData = new FormData();
    formData.append('image', files[0], files[0].name);
    formData.append('directory', directory);
    
    props.dispatch(actions.dbUploadImages({
      path: config.api.uploadSundriesImages,
      data: formData,
    }));
  
    setImages(prev => [...prev, files[0].name]);
  }
  
  const savePost = () => {
    console.log('/BlankSundriesItem/ -save');
    
    if (headline.length < 3) return;
    if (copy.length < 3) return;
  
    props.dispatch(actions.dbCreateSundries({
      headline,
      copy,
      images,
    }));
  }
  
  const deletePost = () => {
    console.log('/BlankSundriesItem/ -save');
    props.deleteFn();
  }
  
  return (
      <div className={cx('sundries-item')}>
        <div className={'sundries-item__inner'}>
          <div className={cx('sundries-item__images')}>
            {images.map((item,index) => {
              return (
                  <img src={`${config.api.sundriesImagesPath}/${item}?cb=${trigger}`} key={utils.uid()}/>
              )
            })
            }
            
            <input type="file" className="file-input" id="upload" multiple onChange={(e) => {
              upload(e.target.files);
            }}/>
          
          
          </div>
          <div className={'sundries-item__body'}>
            
            <div className="form-row">
              <div className="form-group form-group--full-width">
                <input className={cx('input-item input-item--large')}
                       maxLength={128}
                       type="text" placeholder='Headline' value={headline}
                       onChange= {(e) => {
                         setHeadline(e.target.value);
                       }}
                       onKeyPress={(e) => {
                         if (e.key !== 'Enter') return;
                       }}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group form-group--full-width">
                <textarea className={cx('text-area')} value={copy} onChange={(e) => {
                  /*setNotes(e.target.value);
                  setIsDirtyData(true);*/
                  setCopy(e.target.value);
                }}/>
              </div>
            </div>
            
            
            
            
            
            {/*<p className={'sundries-item__copy'}>{props.data.copy}</p>*/}
          
          </div>
        </div>
        
        <div className='variations-item__action-bar'>
            <div className={cx('button-group')}>
              <button className={cx('button')}
                      onClick={() => savePost()}
              >SAVE</button>
              <button className={cx('button')}
                      onClick={() => deletePost()}
              >DELETE</button>
            </div>
          </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  const {imagesUploaderTrigger} = state;
  return {imagesUploaderTrigger}
};

export default connect(mapStateToProps, null)(BlankSundriesItem);
