import { Router } from 'express';
import { citaController} from '../controllers/citaControllers';

const router = Router();


// Ruta para manejar POST en /api/cita
router.post('/', citaController.addCita);

// Ruta para obtener citas por fecha
router.get('/', citaController.getCitasByFecha);

// Ruta para actualizar el estado de una cita
router.put('/:id_cita', citaController.updateCita);

// Ruta para eliminar una cita
router.delete('/:id_cita', citaController.deleteCita);

export default router;
