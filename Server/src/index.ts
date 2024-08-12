import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import citaRoutes from './routes/citaRoutes';
import indexRoutes from './routes/indexRoutes';
import pacienteRoutes from './routes/pacienteRoutes';
import doctor_especialidadRoutes from './routes/doctor_especialidadRoutes';
import especialidadRoutes from './routes/especialidadRoutes';


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

    this.app.use('/',indexRoutes);
    this.app.use('/api/citas',citaRoutes);
    this.app.use('/api/paciente',pacienteRoutes);
    this.app.use('/api/doctor_especialidad', doctor_especialidadRoutes);
    this.app.use('/api/especialidad', especialidadRoutes);
  }

  start(): void {
    this.app.listen(3000, () => {
      console.log('Server on port 3000');
    });
  }
}

const server = new Server();
server.start();
