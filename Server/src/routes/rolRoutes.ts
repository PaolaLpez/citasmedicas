import express, { Router } from 'express';
import { rolControllers } from '../controllers/rolControllers'; // Asegúrate de que la ruta al controlador sea correcta

const router: Router = express.Router();

// Ruta para obtener la lista de roles
router.get('/', rolControllers.list);

// Ruta para crear un nuevo rol
router.post('/', rolControllers.create);

// Ruta para obtener un rol por ID
router.get('/:id_rol', rolControllers.getOne);

// Ruta para actualizar un rol existente
router.put('/:id_rol', rolControllers.update);

// Ruta para eliminar un rol existente
router.delete('/:id_rol', rolControllers.delete);

export default router;
