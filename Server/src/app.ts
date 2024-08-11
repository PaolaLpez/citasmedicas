import express from 'express';
import bodyParser from 'body-parser';
import doctorRoutes from './routes/doctorRoutes';
import citaRoutes from './routes/citaRoutes'; // Suponiendo que ya tienes estas rutas
import horarioRoutes from './routes/horarioRoutes';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/doctor', doctorRoutes);
app.use('/api/cita', citaRoutes); // Rutas para citas
app.use('/api/horario', horarioRoutes);

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
