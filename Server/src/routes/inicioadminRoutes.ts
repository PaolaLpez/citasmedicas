import { Router } from 'express';
import { inicioAdminControllers } from '../controllers/inicioadminControllers';

class InicioAdminRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post('/', inicioAdminControllers.create);
    this.router.get('/', inicioAdminControllers.list);
    this.router.get('/:id_administrador', inicioAdminControllers.getOne);
    this.router.put('/:id_administrador', inicioAdminControllers.update);
    this.router.delete('/:id_administrador', inicioAdminControllers.delete);
  }
}

const inicioAdminRoutes = new InicioAdminRoutes();
export default inicioAdminRoutes.router;