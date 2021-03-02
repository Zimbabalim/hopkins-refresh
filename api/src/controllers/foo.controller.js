import Foo from '../models/foo.model.js';

export const getAllFoos = (req, res) => {
  res.send('gidday from getAllFoos');
}

export const getOneFoo = (req, res) => {
  res.send(`gidday from getOneFoo: ${req.params.id}`);
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
    console.error('/foo.controller/ -createFoo FUCKED', error);
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
