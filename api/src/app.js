import express from 'express';

const PORT = 3001;
const app = express();

app.listen(PORT, () => {
  console.log('\n*****************************');
  console.log('/app/ -RUNNING:', PORT);
  console.log('*****************************\n');
});
