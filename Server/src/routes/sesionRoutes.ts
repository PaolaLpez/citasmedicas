import express, { Router } from 'express';
import { sesionControllers } from '../controllers/sesionControllers';

const router: Router = express.Router();

// Ruta para obtener la lista de sesiones
router.get('/', sesionControllers.list);

// Ruta para crear una nueva sesión
router.post('/', sesionControllers.create);

// Ruta para obtener una sesión por usuario
router.get('/:usuario', sesionControllers.getOne);

// Ruta para actualizar una sesión existente
router.put('/:usuario', sesionControllers.update);

// Ruta para eliminar una sesión existente
router.delete('/:usuario', sesionControllers.delete);

export default router;
