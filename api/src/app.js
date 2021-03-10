import express from 'express';
import mongoose from 'mongoose';
import initRoutes from './routes/index.js';

const DB_PORT = process.env.DB_PORT || 27017;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const dbPath = `mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`;
mongoose.connect(dbPath, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

// const db = mongoose.connection.useDb('hopkins');
// db.on('error', console.error.bind(console, '!!! DB connection error !!!'))
// db.on('connected', console.log.bind(console, '=== DB connected ==='))

const PORT = process.env.PORT;
const app = express();
initRoutes(app);

app.listen(PORT, () => {
  console.log('\n*****************************');
  console.log('/app/ -RUNNING:', PORT);
  console.log('*****************************\n');
});


