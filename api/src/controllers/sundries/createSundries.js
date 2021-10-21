import Sundries from '../../models/Sundries.model.js';

export const createSundries = async (req, res) => {
  console.log('\n*** /SUNDRIES.controller/ -createProduct\n', req.body);
  console.log('/createProduct/ ******************************************************');
  if(!req.body){
    res
        .status(400)
        .send({
          message: 'PRODUCT cannot be empty...',
          success: false
        });
  }
  
  
  // *** ugly but works
  /*const query = Product.find({friendly_name: req.body.friendly_name});
  
  let checkExisting = null;
  
  try {
    checkExisting = await query.exec();
  } catch (error) {
    console.log('/createProduct/ -createProduct ERROR');
    return false;
  }
  
  if (checkExisting.length > 0) {
    res.status(200).send({ // *** 200 so doesn't error, but passes message with fail
      message: 'unsaved - product already exists...',
      uiStatus: {
        message: 'unsaved - product already exists...',
        className: '--error',
      },
      success: false
    });
  }*/
  
  const getPrettyDate = function () {
    let r,
        d = new Date().toDateString(),
        z = d.split(" ");
    
    r = z[ 2 ] + " " + z[ 1 ] + " " + z[ 3 ];
    
    return r;
  };
  
  
  const sundries = new Sundries({
    /*friendly_name: req.body.friendly_name,
    default_product_code: req.body.code,
    variations: [],*/
    headline: req.body.headline,
    copy: req.body.copy,
    images: req.body.images,
    date: getPrettyDate(),
  });
  
  let data;
  try {
    data = await sundries.save();
  } catch (error) {
    console.error('/USER.controller/ -createProduct --FUCKED', error);
    res
        .status(200)
        .send({
          message: 'unsaved - incomplete data',
          uiStatus: {
            message: 'unsaved - incomplete data',
            className: '--error',
          },
          success: false
        });
  }
  
  res
      .status(201)
      .send({
        message: 'saved new sundry!',
        uiStatus: {
          message: 'saved new sundry!',
          className: '--success',
        },
        success: true,
        data
      })
}

export default createSundries;
