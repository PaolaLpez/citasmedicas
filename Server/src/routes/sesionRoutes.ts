import { Router } from 'express';
import { sesionControllers } from '../controllers/sesionControllers';

class SesionRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', sesionControllers.list);
        this.router.post('/', sesionControllers.create);
        this.router.get('/:usuario', sesionControllers.getOne);
        this.router.put('/:usuario', sesionControllers.update);
        this.router.delete('/:usuario', sesionControllers.delete);
    }
}

const sesionRoutes = new SesionRoutes();
export default sesionRoutes.router;