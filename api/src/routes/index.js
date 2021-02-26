import testRoutes from './test.routes.js';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:3000'
}

const initRoutes = (app) => {
  app.use(cors(corsOptions));
  app.use(testRoutes);
}

export default initRoutes;
