import { Router } from 'express';
import DoctorController from '../controllers/doctorControllers';

const router = Router();
const doctorController = new DoctorController();

// Ruta para manejar POST en /api/doctor
router.post('/', doctorController.addDoctor);

// Ruta para obtener todos los doctores
router.get('/', doctorController.getDoctors);

// Ruta para actualizar un doctor
router.put('/:id_doctor', doctorController.updateDoctor);

// Ruta para eliminar un doctor
router.delete('/:id_doctor', doctorController.deleteDoctor);

export default router;
