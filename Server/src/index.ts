import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import citaRoutes from './routes/citaRoutes';
import indexRoutes from './routes/indexRoutes';
import pacienteRoutes from './routes/pacienteRoutes';


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
<<<<<<< HEAD
    this.app.use('/api/cita', citaRoutes);
=======
    this.app.use('/',indexRoutes);
    this.app.use('/api/citas',citaRoutes);
    this.app.use('/api/paciente',pacienteRoutes)
>>>>>>> origin/Cristian13
  }

  start(): void {
    this.app.listen(3000, () => {
      console.log('Server on port 3000');
    });
  }
}

const server = new Server();
server.start();
