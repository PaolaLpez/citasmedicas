import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import citaRoutes from './routes/citaRoutes';
import indexRoutes from './routes/indexRoutes';
import pacienteRoutes from './routes/pacienteRoutes';
import doctor_especialidadRoutes from './routes/doctor_especialidadRoutes';
import especialidadRoutes from './routes/especialidadRoutes';
import doctorRoutes from './routes/doctorRoutes';
import horarioRoutes from './routes/horario';
import inicioadminRoutes from './routes/inicioadminRoutes';  
import rolRoutes from './routes/rolRoutes';

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
    this.app.use('/api/cita', citaRoutes);
    this.app.use('/api/paciente', pacienteRoutes);
    this.app.use('/api/doctor_especialidad', doctor_especialidadRoutes);
    this.app.use('/api/especialidad', especialidadRoutes);
    this.app.use('/api/doctor', doctorRoutes);
    this.app.use('/api/horario', horarioRoutes);
    this.app.use('/api/inicio-administrador', inicioadminRoutes);  
    this.app.use('/api/rol', rolRoutes);
  }

  start(): void {
    this.app.listen(3000, () => {
      console.log('Server on port 3000');
    });
  }
}

const server = new Server();
server.start();
