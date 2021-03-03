import express from 'express';
import mongoose from 'mongoose';
import initRoutes from './routes/index.js';

const DB_PORT = process.env.DB_PORT || 27017;
const DB_URL = process.env.DB_URL;
const dbPath = `mongodb://${DB_URL}:${DB_PORT}`;
mongoose.connect(dbPath, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const db = mongoose.connection;
db.on('error', console.error.bind(console, '!DB connection error!'))

const PORT = process.env.PORT;
const app = express();
initRoutes(app);

app.listen(PORT, () => {
  console.log('\n*****************************');
  console.log('/app/ -RUNNING:', PORT);
  console.log('*****************************\n');
});


