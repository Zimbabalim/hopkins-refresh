import Foo from '../models/foo.model.js';
import mongoose from 'mongoose';

// TODO patch, delete methods

export const getAllFoos = async (req, res) => {
  let data;
  try {
    data = await Foo.find();
  } catch (error) {
    console.error('/foo.controller/ -getAllFoos --FUCKED', error);
    res
        .status(500)
        .send({
          message: 'totally fucked',
          success: false
        });
  }
  res.send({
    data,
    success: true
  });
}

export const getOneFoo = async (req, res) => {
  // res.send(`gidday from getOneFoo: ${req.params.id}`);
  
  const {id} = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  
  if (!isValid) {
    res
        .status(400)
        .send({
          message: 'invalid request (ObjectId)',
          success: false,
        })
  }
  
  let data;
  try {
    data = Foo.findById(id);
  } catch (error) {
    res
        .status(500)
        .send({
          message: 'totally fucked',
          success: false,
        });
  }
  
  res.send({
    data,
    success: true
  });
  
}

export const createFoo = async (req, res) => {
  console.log('\n*** /foo.controller/ -createFoo\n', req.body);
  if(!req.body){
    res
        .status(400)
        .send({
          message: 'Foo cannot be empty...',
          success: false
        });
  }
  
  const foo = new Foo({
    title: req.body.title
  });
  
  let data;
  try {
    data = await foo.save();
  } catch (error) {
    console.error('/foo.controller/ -createFoo --FUCKED', error);
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
