import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import pacienteRoutes from './routes/pacienteRoutes';

const app = express();

// Configuración del servidor
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('/api/paciente', pacienteRoutes);

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});

