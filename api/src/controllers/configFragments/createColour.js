import Colour from '../../models/configFragments/Colour.model.js';


export const createColour = async (req, res) => {
  
  if(!req.body){
    res.status(400)
        .send({
          message: 'COLOUR cannot be empty...',
          success: false
        });
  }
  
  const query = Colour.find({code: req.body.code});
  let checkExisting = null;
  
  try {
    checkExisting = await query.exec();
  } catch (error) {
    console.log('/createColour/ -checkExisting ERROR');
    return false;
  }
  
  if (checkExisting.length > 0) {
    res.status(200).send({ // *** 200 so doesn't error, but passes message with fail
      // message: `unsaved - colour ${req.body.code} already exists... :|`,
      message: `This colour already exists`,
      uiStatus: {
        // message: `unsaved - colour ${req.body.code} already exists... :|`,
        message: `This colour already exists`,
        className: '--error',
      },
      success: false
    });
  }
  
  const colour = new Colour({
    code: req.body.code,
    label: req.body.label,
    name: req.body.label.replace(/ /g, '_').toLowerCase(),
  })
  
  let data;
  
  try {
    data = await colour.save();
  } catch (error) {
    
    console.log('===== /createColour/ -createColour', error);
    
    res.status(200)
        .send({
          message: 'unsaved - incomplete data',
          uiStatus: {
            message: 'unsaved - incomplete data',
            className: '--error',
          },
          success: false
        })
  }
  
  res.status(201)
      .send({
        // message: `saved new colour: ${req.body.code}, ${req.body.label} :)`,
        message: ``,
        uiStatus: {
          // message: `saved new colour: ${req.body.code}, ${req.body.label} :)`,
          message: ``,
          className: '--success',
        },
        success: true,
        data,
      })
}

export default createColour
