/*import express from 'express';
import uploadImages from '../controllers/asset/uploadImages.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: './public/data/uploads/' }); // *** does create dir inside docker!

router.post('/asset/uploadImages', upload.single('image'), uploadImages);*/



import express from 'express';
import uploadImages from '../controllers/asset/uploadImages.js';
import multer from 'multer';

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/data/uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
const upload = multer({ storage: storage }).single('image');


router.post('/asset/uploadImages', async (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.log('/assetRoutes/ -ERROR');
    } else {
      const FileName = req.file.filename;
      res.status(200).send(FileName);
    }
  })
});




/*

var upload = multer({ storage: storage }).single('userPhoto');


*/


export default router;
