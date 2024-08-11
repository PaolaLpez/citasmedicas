import { Router } from "express";
import { indexController } from "../controllers/indexControllers"; // Asegúrate de que esta ruta sea correcta

class IndexRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/api/paciente', indexController.hello);
        this.router.get('/api/cita', indexController.index);
        this.router.get('/api/doctor', indexController.index);
        this.router.get('/api/horario', indexController.index);
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;

