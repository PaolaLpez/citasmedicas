import { Router } from "express";
import { pacienteControllers } from "../controllers/pacienteControllers";


class PacienteRoutes {
    public router: Router = Router();// Se está creando la propiedad que guardara el objeto
    // devuelto y se inicializa esta propiedad en la misma línea de código. 
  
    constructor() {
      this.config();
    }
  
    config(): void {
      this.router.get('/', pacienteControllers.list);
      this.router.post('/', pacienteControllers.create);
      this.router.delete('/:id_paciente', pacienteControllers.delete);
      this.router.put('/:id_paciente', pacienteControllers.update);
      this.router.get('/:id_paciente', pacienteControllers.getOne);
    }
  }
  


const pacienteRoutes = new PacienteRoutes()
export default pacienteRoutes.router;