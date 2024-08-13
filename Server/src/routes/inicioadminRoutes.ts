import { Router } from 'express';
import { inicioAdminControllers } from '../controllers/inicioadminControllers';

const router: Router = Router();

// Ruta para crear un nuevo administrador
router.post('/', inicioAdminControllers.create);

// Ruta para obtener todos los administradores
router.get('/', inicioAdminControllers.list);

// Ruta para obtener un administrador por ID
router.get('/:id_administrador', inicioAdminControllers.getOne);

// Ruta para actualizar un administrador existente
router.put('/:id_administrador', inicioAdminControllers.update);

// Ruta para eliminar un administrador existente
router.delete('/:id_administrador', inicioAdminControllers.delete);

export default router;
