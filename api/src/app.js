import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const DB_PORT = process.env.DB_PORT || 27017;
const DB_URL = process.env.DB_URL;
const dbPath = `mongodb://${DB_URL}:${DB_PORT}`;
mongoose.connect(dbPath, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, '!DB connection error!'))

const PORT = process.env.PORT;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
}

app.get('/test', cors(corsOptions), (req, res) => {
  console.log('/app/ -CALLED TEST');
  res.send('gidday');
});

app.get('/ping-db', cors(corsOptions), (req, res) => {
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
})

app.listen(PORT, () => {
  console.log('\n*****************************');
  console.log('/app/ -RUNNING:', PORT);
  console.log('*****************************\n');
});


