import multer from 'multer';
import * as fs from 'fs';

// *** upload to temp 'uploadDir' then move to 'destinationDir'
export const uploadImages = async (req, res) => {
  
  const uploadDir = './public/uploads';
  const destinationDir = './public/assets/images/products/';
  
  const storage = multer.diskStorage({
    destination: function (req, file, fn) {
      fn(null, uploadDir);
    },
    filename: function (req, file, fn) {
      console.log('/uploadImages/ -filename', file.originalname);
      fn(null, file.originalname);
    }
  });
  //{ fieldSize: 10 * 1024 * 1024 }
  const upload = multer({ storage: storage }).single('image');
// *** util to move files after upload

  /* move files after upload */
const moveFiles = (options) => {
  const currentPath = `${uploadDir}/${options.files[0]}`;
  const destinationPath = `${destinationDir}/${options.directory}/${options.files[0]}`;
  
  fs.rename(currentPath, destinationPath, function (error) {
    if (error) {
      console.error('/uploadImages/ -failed:', currentPath, '-->', destinationPath);
      return;
    }
    console.log('/uploadImages/ -success:', currentPath, '-->', destinationPath);
  });
}
  
  /* upload */
  upload(req, res, (error) => {
    if (!req.file) {
      console.log('/uploadImages/ -ERROR --file not present!');
      res .status(500).send({
            message: 'file not present!',
            success: false
          });
      return;
    }
    
    moveFiles({
      files: [req.file.filename],
      directory: req.body.directory,
    });
    
    if (error) {
      console.error('/assetRoutes/ -uploadImages --ERROR', error);
      
      res
          .status(500)
          .send({
            message: 'totally fucked',
            success: false
          });
      
    } else {
      console.log('/uploadImages/ -uploadImages --uploaded!', req.file);
  
      res
      .status(200)
      .send({
        message: 'saved images',
        success: true
      });
    }
  });
}

export default uploadImages;
