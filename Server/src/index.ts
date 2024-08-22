import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//RoutesTablas
import citaRoutes from './routes/citaRoutes';
import indexRoutes from './routes/indexRoutes';
import especialidadRoutes from './routes/especialidadRoutes';
import horarioRoutes from './routes/horarioRoutes';
import rolRoutes from './routes/rolRoutes';
import loginRoutes from './routes/loginRoutes';
import usuarioRoutes from './routes/usuarioRoutes';



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
    this.app.use('/', indexRoutes);
    this.app.use('/api/login', loginRoutes);
    this.app.use('/api/cita', citaRoutes);
    this.app.use('/api/especialidad', especialidadRoutes);
    this.app.use('/api/horario', horarioRoutes);
    this.app.use('/api/rol', rolRoutes);
    this.app.use('/api/usuario', usuarioRoutes);
  }

  start(): void {
    this.app.listen(3000, () => {
      console.log('Server on port 3000');
    });
  }
}

const server = new Server();
server.start();
