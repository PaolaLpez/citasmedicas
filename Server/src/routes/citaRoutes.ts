import { Router } from 'express';
import { citaController } from '../controllers/citaControllers'


class CitaRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get('/', citaController.index);
  }
}

const citaRoutes = new CitaRoutes();
export default citaRoutes.router;
