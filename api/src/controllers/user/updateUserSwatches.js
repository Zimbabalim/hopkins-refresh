import User from '../../models/User.model.js';
import mongoose from 'mongoose';
// import methods from '../utils/methods';
// import finder from '../generic/finder';

export const updateUserSwatches = async (req, res) => {
  
  console.log('\n*** /USER.controller/ -updateUserSwatches qqq\n', req.body);
  
  const createRichSwatch = (swatch, dated) => {
    return {
      uid: swatch,
      datestamp: (dated) ? new Date() : null,
      pretty_date: (dated) ? getPrettyDate() : null,
      cms_marked: 0
    }
  }
  
  const getPrettyDate = () => {
    let r,
        d = new Date().toDateString(),
        z = d.split(" ");
    r = z[ 2 ] + " " + z[ 1 ] + " " + z[ 3 ];
    return r;
  };

  
  let data;
  try {
  
    data = await User.findOne({ _id : req.query.uid });
    const cloneRichSwatches = [...data.rich_swatches];
  
    // *** SAVE
    if (req.query.method === 'add') {
      console.log('/updateUserSwatches/ -updateUserSwatches ADD', req.query.swatch);
      cloneRichSwatches.push(createRichSwatch(req.query.swatch, true));
    }
  
    // *** DELETE
    if (req.query.method === 'remove') {
      console.log('/updateUserSwatches/ -updateUserSwatches REMOVE', req.query.swatch);
  
      let removeIndex = null;
      cloneRichSwatches.map((item, index) => {
        if (item.uid === req.query.swatch) {
          console.log('/updateUserSwatches/ -MATCH', item.uid, req.query.swatch, index);
          removeIndex = index;
        }
      });
      cloneRichSwatches.splice(removeIndex, 1);
      console.log('/updateUserSwatches/ -updateUserSwatches DELETED', cloneRichSwatches);
    }
  
    // *** also update annoying legacy swatches
    const swatches = cloneRichSwatches.map((item) => {
      return item.uid;
    });
    
    data = await User.findOneAndUpdate(
        {_id: req.query.uid},
        {
          swatches,
          rich_swatches: cloneRichSwatches,
        }, {
          new: true
        }
    );
    
  } catch (error) {
    console.error('/USER.controller/ -updateUserSwatches --FUCKED', error);
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
        message: 'updated user swatches',
        success: true,
        data
      })
}

export default updateUserSwatches;
