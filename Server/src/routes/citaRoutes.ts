import { Router } from "express";
import { citaController } from "../controllers/citaControllers";

class CitaRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', citaController.list);
        this.router.post('/', citaController.create);
        this.router.delete('/:id_cita', citaController.delete);
        this.router.put('/:id_cita', citaController.update);
        this.router.get('/:id_cita', citaController.getOne);
    }
}

export const citaRoutes = new CitaRoutes().router;
export default citaRoutes;

