import React from "react";
import {actions} from '../../state';
import {connect} from 'react-redux';
import cx from 'classnames';
import config from '../../config';

const ImageUploader = (props) => {
  
  const upload = (files, directory) => {
    
    console.log('/ImageUploader/ -upload', files, files[0].name);
    
    const formData = new FormData();
    formData.append('image', files[0], files[0].name);
    // formData.append('image', files);
    formData.append('directory', directory);
    
    
    console.log('/ImageUploader/ -upload', formData.entries());
    console.log('/ImageUploader/ -upload', formData.values());
    
    props.dispatch(actions.dbUploadImages({
      path: config.api.uploadImages,
      data: formData,
    }));
  }
  
  /*<label htmlFor="upload-photo">Browse...</label>
  <input type="file" name="photo" id="upload-photo"/>*/
  
  return (
      <div className={cx('product-filter image-uploader')}>
        <h4>Upload images</h4>
        {/*<input type="file" id="input" multiple onChange={(e) => {
          upload(e.target.files);
        }}/>*/}
        
        <div className="form-row">
          <div className="form-group form-group--full-width">
  
            <div className="image-uploader__control"><label htmlFor="upload_A" className="file-input__label">A</label>
              <input type="file" className="file-input" id="upload_A" multiple onChange={(e) => {
                upload(e.target.files, 'A');
              }}/></div>
  
            <div className="image-uploader__control"><label htmlFor="upload_" className="file-input__label">B</label>
              <input type="file" className="file-input" id="upload_B" multiple onChange={(e) => {
                upload(e.target.files, 'B');
              }}/></div>
  
            <div className="image-uploader__control"><label htmlFor="upload_C" className="file-input__label">C</label>
              <input type="file" className="file-input" id="upload_C" multiple onChange={(e) => {
                upload(e.target.files, 'C');
              }}/></div>
            
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  const {selectedDesign} = state;
  return {selectedDesign}
};

export default connect(mapStateToProps, null)(ImageUploader);
