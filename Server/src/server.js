import express from 'express';
import citaRoutes from './routes/citaRoutes';

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas
app.use('/api/cita', citaRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
