import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import pacienteRoutes from './routes/pacienteRoutes';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/paciente', pacienteRoutes);

app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});

