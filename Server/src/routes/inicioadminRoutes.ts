import { Router } from 'express';
import { inicioAdminControllers } from '../controllers/inicioadminControllers';

class InicioAdminRoutes {
  public router: Router = Router(); // Se crea la propiedad router y se inicializa

  constructor() {
    this.config();
  }

  config(): void {
    // Definir las rutas y asociarlas con los métodos del controlador
    this.router.post('/', inicioAdminControllers.create);
    this.router.get('/', inicioAdminControllers.list);
    this.router.get('/:id_administrador', inicioAdminControllers.getOne);
    this.router.put('/:id_administrador', inicioAdminControllers.update);
    this.router.delete('/:id_administrador', inicioAdminControllers.delete);
  }
}

// Crear una instancia de la clase y exportar solo el objeto router
const inicioAdminRoutes = new InicioAdminRoutes();
export default inicioAdminRoutes.router;