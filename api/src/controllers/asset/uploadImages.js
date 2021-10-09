import User from '../../models/Product.model.js';
import mongoose from 'mongoose';

export const uploadImages = async (req, res) => {
  
  console.log('\n*** /ASSET.controller/ -uploadImages ==== \n', req.body, req.file);
  
  /* var source = fs.createReadStream( req.files.image.file );
  var dest = fs.createWriteStream( "./public/assets/images/sundries/" + req.files.image.filename );*/
  
  // const source = fs.createReadStream( req.files.image.file );
  
  res
      .status(200)
      .send({
        message: '==== ping back ===',
        success: true
      });
  
  return;
  
  
  
  const {id} = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  
  if(!req.body || !isValid){
    res
        .status(400)
        .send({
          message: 'product cannot be empty / id was invalid',
          success: false
        });
  }
  
  let data;
  try {
    data = await User.findOneAndUpdate(
        {_id: id},
        {
          default_product_code: req.body.default_product_code,
          friendly_name: req.body.friendly_name,
          variations: req.body.variations,
        }, {
          new: true
        }
    )
  } catch (error) {
    console.error('/USER.controller/ -uploadImages --FUCKED', error);
    res
        .status(500)
        .send({
          message: 'totally fucked',
          success: false
        });
  }
  
  res
      .status(201)
      .send({
        message: 'it worked!!!',
        success: true,
        data
      })
}

export default uploadImages;
