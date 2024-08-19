import { Router } from 'express';
import { rolControllers } from '../controllers/rolControllers';

class RolRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', rolControllers.list);
        this.router.post('/', rolControllers.create);
        this.router.get('/:id_rol', rolControllers.getOne);
        this.router.put('/:id_rol', rolControllers.update);
        this.router.delete('/:id_rol', rolControllers.delete);
    }
}

const rolRoutes = new RolRoutes();
export default rolRoutes.router;
