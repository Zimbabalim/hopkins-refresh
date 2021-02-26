import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/test', (req, res) => {
  console.log('/app/ -CALLED TEST');
  res.send('gidday');
});

router.get('/ping-db', (req, res) => {
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
});

export default router;
