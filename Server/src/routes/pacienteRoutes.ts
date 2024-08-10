import { Router } from "express";
import { pacienteControllers } from "../controllers/pacienteControllers";


class PacienteRoutes {
    public router: Router = Router();// Se está creando la propiedad que guardara el objeto
    // devuelto y se inicializa esta propiedad en la misma línea de código. 
  
    constructor() {
      this.config();
    }
  
    config(): void {
      this.router.get('/', pacienteControllers.getOne);
      this.router.post('/', pacienteControllers.create);
      this.router.delete('/:id', pacienteControllers.delete);
      this.router.put('/:id', pacienteControllers.update);
      this.router.get('/:id', pacienteControllers.getOne);
    }
  }
  


const pacienteRoutes = new PacienteRoutes()
export default pacienteRoutes.router;