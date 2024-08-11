import { Router } from "express";
import { doctor_especialidadControllers } from "../controllers/doctor_especialidadControllers";

class Doctor_EspecialidadRoutes {
    public router: Router = Router();// Se está creando la propiedad que guardara el objeto
    // devuelto y se inicializa esta propiedad en la misma línea de código. 
  
    constructor() {
      this.config();
    }
  
    config(): void {
      this.router.get('/', doctor_especialidadControllers.list);
      this.router.post('/', doctor_especialidadControllers.create);
      this.router.delete('/:id_paciente', doctor_especialidadControllers.delete);
      this.router.put('/:id_paciente', doctor_especialidadControllers.update);
      this.router.get('/:id_paciente', doctor_especialidadControllers.getOne);
    }
  }
  


const doctor_especialidadRoutes = new Doctor_EspecialidadRoutes()
export default doctor_especialidadRoutes.router;