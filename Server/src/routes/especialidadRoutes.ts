import { Router } from "express";
import { especialidaControllers } from "../controllers/especialidadControllers";


class EspecialidadRoutes {
    public router: Router = Router();

    constructor() {
      this.config();
    }
  
    config(): void {
      this.router.get('/', especialidaControllers.list);
      this.router.post('/', especialidaControllers.create);
      this.router.delete('/:id_especialidad', especialidaControllers.delete);
      this.router.put('/:id_especialidad', especialidaControllers.update);
      this.router.get('/:id_especialidad', especialidaControllers.getOne);
    }
  }
  
const especialidadRoutes = new EspecialidadRoutes()
export default especialidadRoutes.router;