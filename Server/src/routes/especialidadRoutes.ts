import { Router } from "express";
import { especialidadControllers} from "../controllers/especialidadControllers";


class EspecialidadRoutes {
    public router: Router = Router();

    constructor() {
      this.config();
    }
  
    config(): void {
      this.router.get('/', especialidadControllers.list);
      this.router.post('/', especialidadControllers.create);
      this.router.delete('/:id_especialidad', especialidadControllers.delete);
      this.router.put('/:id_especialidad', especialidadControllers.update);
      this.router.get('/:id_especialidad', especialidadControllers.getOne);
    }
  }
  
const especialidadRoutes = new EspecialidadRoutes()
export default especialidadRoutes.router;