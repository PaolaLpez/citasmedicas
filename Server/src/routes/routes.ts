import { Router } from 'express';
import doctorRoutes from './doctorRoutes'; // Ruta correcta al archivo de rutas para doctores
import citaRoutes from './citaRoutes'; // Supuesto archivo de rutas para citas
import horarioRoutes from './horarioRoutes';

const router = Router();

// Usar las rutas para doctores
router.use('/api', doctorRoutes);

// Usar las rutas para citas
router.use('/api', citaRoutes);

router.use('/api', horarioRoutes);

export default router;

