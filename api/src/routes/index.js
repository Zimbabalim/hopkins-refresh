import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js';
import assetRoutes from './assetRoutes.js';

const corsOptions = {
  origin: 'http://localhost:3000'
}

const initRoutes = (app) => {
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(userRoutes);
  app.use(productRoutes);
  app.use(assetRoutes);
}

export default initRoutes;
