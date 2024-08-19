import { Router } from "express";
import { doctorController } from "../controllers/doctorControllers";

class DoctorRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', doctorController.list);
        this.router.post('/', doctorController.create);
        this.router.delete('/:id_doctor', doctorController.delete);
        this.router.put('/:id_doctor', doctorController.update);
        this.router.get('/:id_doctor', doctorController.getOne);
    }
}

export const doctorRoutes = new DoctorRoutes().router;
export default doctorRoutes;


