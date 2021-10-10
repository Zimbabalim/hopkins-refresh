import express from 'express';
import mongoose from 'mongoose';
import initRoutes from './routes/index.js';
import * as path from 'path';

const DB_PORT = process.env.DB_PORT || 27017;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const dbPath = `mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`;
mongoose.connect(dbPath, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

mongoose.set('debug', true);

const PORT = process.env.PORT;
const app = express();

app.use('/assets', express.static('public/assets'));

initRoutes(app);

app.listen(PORT, () => {
  console.log('\n*****************************');
  console.log('/app/ -RUNNING:', PORT);
  console.log('*****************************\n');
});


