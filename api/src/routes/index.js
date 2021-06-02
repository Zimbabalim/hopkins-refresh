import cors from 'cors';
import bodyParser from 'body-parser';
// import testRoutes from './testing/test.routes.js';
// import fooRoutes from './testing/foo.routes.js';

import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js';


const corsOptions = {
  origin: 'http://localhost:3000'
}

const initRoutes = (app) => {
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  // ***
/*  app.use(testRoutes);
  app.use(fooRoutes);*/
  // ***
  app.use(userRoutes);
  app.use(productRoutes);
}

export default initRoutes;
