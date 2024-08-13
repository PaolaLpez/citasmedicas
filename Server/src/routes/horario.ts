import { Router } from 'express';
import HorarioController from '../controllers/horarioControllers';

const router = Router();
const horarioController = new HorarioController();

// Route to handle POST on /api/horario
router.post('/', horarioController.addHorario);

// Route to get all horarios
router.get('/', horarioController.getHorarios);

// Route to update a horario
router.put('/:id_horario', horarioController.updateHorario);

// Route to delete a horario
router.delete('/:id_horario', horarioController.deleteHorario);

export default router;
