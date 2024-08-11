import { Router } from 'express';
import PacienteController from '../controllers/pacienteController';

const router = Router();
const pacienteController = new PacienteController();

// Ruta para agregar un nuevo paciente
router.post('/', pacienteController.addPaciente);

// Ruta para obtener todos los pacientes
router.get('/', pacienteController.getPacientes);

// Ruta para obtener un paciente por ID
router.get('/:id_paciente', pacienteController.getPacienteById);

// Ruta para actualizar un paciente
router.put('/:id_paciente', pacienteController.updatePaciente);

// Ruta para eliminar un paciente
router.delete('/:id_paciente', pacienteController.deletePaciente);

export default router;
