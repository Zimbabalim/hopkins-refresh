import React from "react";
import {actions} from '../../state';
import {connect} from 'react-redux';

const ImageUploader = (props) => {
  
  
  /* var source = fs.createReadStream( req.files.image.file );
    var dest = fs.createWriteStream( "./public/assets/images/sundries/" + req.files.image.filename );*/
  
  /*let fd = new FormData();
                fd.append("image", fl, fl.name );*/
  
  const upload = (files) => {
    const formData = new FormData();
    formData.append('image', files[0], files[0].name);
    props.dispatch(actions.dbUploadImages({
      type: 'A',
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
