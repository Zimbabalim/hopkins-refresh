import React from "react";
import {actions} from '../../state';
import {connect} from 'react-redux';

const ImageUploader = (props) => {
  
  const upload = (files) => {
    
    console.log('/ImageUploader/ -upload', files,files[0].name);
    
    const formData = new FormData();
    // formData.append('image', files[0], files[0].name);
    formData.append('image', files[0], files[0].name);
    formData.append('directory', 'B');
    props.dispatch(actions.dbUploadImages({
      data: formData,
    }));
  }
  
  return (
      <>
        <h2>Upload images</h2>
        <input type="file" id="input" multiple onChange={(e) => {
          // console.log('/ImageUploader/ -ImageUploader', e.target.files);
          upload(e.target.files);
        }}/>
      </>
  );
};

const mapStateToProps = (state) => {
  const {selectedDesign} = state;
  return {selectedDesign}
};

export default connect(mapStateToProps, null)(ImageUploader);
