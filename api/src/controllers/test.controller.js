import mongoose from 'mongoose';


export const testRes = (req, res) => {
  console.log('/app/ -CALLED TEST');
  res.send('gidday cobbah');
}

export const pingRes = (req, res) => {
  mongoose.connection.db.admin().ping((error, result) => {
    if (error || !result) {
      console.log('/app/ -', `ping failed with error: ${error}`);
      res.send({
        msg: `ping failed with error: ${error}`,
        status: 'fail'
      })
      
    } else {
      console.log('/app/ -', `ping is good: ${result}`);
      res.send({
        msg: `ping is good: ${result}`,
        status: 'ok'
      })
    }
  });
}
