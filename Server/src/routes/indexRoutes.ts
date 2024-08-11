import { Router } from "express";
import { indexController } from "../controllers/indexControllers"; // Asegúrate de que esta ruta sea correcta


class IndexRoutes{
    public router: Router = Router();
        constructor() {
    this.config();
}

config():void{
this.router.get('/', (req, resp) => resp.send('Hello')); //Creando una ruta para mi aplicación del servidor para la ruta inicial y se devuelve el mensaje Hello
}
}
const indexRoutes = new IndexRoutes;
export default indexRoutes.router;

