import multer from 'multer';
import * as fs from 'fs';

// *** upload to temp 'uploadDir' then move to 'destinationDir'
export const uploadSundriesImages = async (req, res) => {
  
  const uploadDir = './public/uploads';
  const destinationDir = './public/assets/images/sundries/';
  
  const storage = multer.diskStorage({
    destination: function (req, file, fn) {
      fn(null, uploadDir);
    },
    filename: function (req, file, fn) {
      console.log('/uploadSundriesImages/ -filename', file.originalname);
      fn(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage }).single('image');

// *** util to move files after upload
  
  const moveFiles = (options) => {
    
    console.log('============================================== /uploadSundriesImages/ -moveFiles', options);
    
    const currentPath = `${uploadDir}/${options.files[0]}`;
    const destinationPath = `${destinationDir}/${options.files[0]}`;
    
    fs.rename(currentPath, destinationPath, function (error) {
      
      if (error) {
        console.error('/uploadSundriesImages/ -failed:', currentPath, '-->', destinationPath);
        return;
      }
      console.log('/uploadSundriesImages/ -success:', currentPath, '-->', destinationPath);
    });
  }
  
  
  upload(req, res, (error) => {
    
    moveFiles({
      files: [req.file.filename],
      directory: req.body.directory,
    });
    
    if (error) {
      console.error('/assetRoutes/ -uploadSundriesImages --ERROR', error);
      
      res
          .status(500)
          .send({
            message: 'totally fucked',
            success: false
          });
      
    } else {
      console.log('/uploadSundriesImages/ -uploadSundriesImages --uploaded!', req.files);
      // const FileName = req.file.filename;
      
      res
          .status(200)
          .send({
            message: 'saved images',
            success: true
          });
    }
  });
}

export default uploadSundriesImages;
