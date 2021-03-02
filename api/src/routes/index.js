import cors from 'cors';
import bodyParser from 'body-parser';
import testRoutes from './test.routes.js';
import fooRoutes from './foo.routes.js';


const corsOptions = {
  origin: 'http://localhost:3000'
}

const initRoutes = (app) => {
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(testRoutes);
  app.use(fooRoutes);
}

export default initRoutes;
