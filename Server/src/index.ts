import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import citaRoutes from './routes/citaRoutes';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes(): void {
    this.app.use('/api/citas', citaRoutes);
  }

  start(): void {
    this.app.listen(3000, () => {
      console.log('Server on port 3000');
    });
  }
}

const server = new Server();
server.start();
