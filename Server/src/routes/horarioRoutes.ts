import { Router } from "express";
import { horarioController } from "../controllers/horarioControllers";

class HorarioRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', horarioController.list);
        this.router.post('/', horarioController.create);
        this.router.delete('/:id_horario', horarioController.delete);
        this.router.put('/:id_horario', horarioController.update);
        this.router.get('/:id_horario', horarioController.getOne);
    }
}

export const horarioRoutes = new HorarioRoutes().router;
export default horarioRoutes;

