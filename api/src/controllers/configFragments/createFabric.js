import Fabric from '../../models/configFragments/Fabric.model.js';


export const createFabric = async (req, res) => {
  
  if(!req.body){
    res.status(400)
        .send({
          message: 'FABRIC cannot be empty...',
          success: false
        });
  }
  
  const query = Fabric.find({code: req.body.code});
  let checkExisting = null;
  
  try {
    checkExisting = await query.exec();
  } catch (error) {
    console.log('/createFabric/ -checkExisting ERROR');
    return false;
  }
  
  if (checkExisting.length > 0) {
    res.status(200).send({ // *** 200 so doesn't error, but passes message with fail
      message: `This fabric already exists`,
      uiStatus: {
        message: `This fabric already exists`,
        className: '--error',
      },
      success: false
    });
  }
  
  const fabric = new Fabric({
    code: req.body.code,
    label: req.body.label,
    uid: req.body.label.replace(/ /g, '_').toLowerCase(),
  })
  
  let data;
  
  try {
    data = await fabric.save();
  } catch (error) {
    res.status(200)
        .send({
          message: 'unsaved - incomplete data :{',
          uiStatus: {
            message: 'unsaved - incomplete data :{',
            className: '--error',
          },
          success: false
        })
  }
  
  res.status(201)
      .send({
        // message: `saved new fabric: ${req.body.code}, ${req.body.label} :)`,
        message: ``,
        uiStatus: {
          // message: `saved new fabric: ${req.body.code}, ${req.body.label} :)`,
          message: ``,
          className: '--success',
        },
        success: true,
        data
      })
}

export default createFabric
