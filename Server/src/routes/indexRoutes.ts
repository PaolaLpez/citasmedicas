import { Router } from "express";
import { indexController } from "../controllers/indexControllers";


class IndexRoutes {
    public router: Router = Router();//Se está creando la propiedad que guardara el objeto devuelto 
                                    //y se inicializa esta propiedad en la misma línea de código. 
  
    constructor() {
      this.config();
    }
  
    config(): void {
      this.router.get('/', indexController.index);//Creando una ruta de mi aplicación del servidor para  
                                                  //la ruta inicial y se devuelve el mensaje Hello.
      /* this.router.delete('/:Id',inventarioController.delete); //aquí se indica que recibe como parámetro 
      el id  del juego para poder eliminarlo. */
    }
  }
const indexRoutes = new IndexRoutes;
export default indexRoutes.router;
