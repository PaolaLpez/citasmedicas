import { Router } from "express";
import { usuarioControllers } from "../controllers/usuarioController";

class UsuarioRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post('/', usuarioControllers.registrarUsuario);
    this.router.post('/', usuarioControllers.loginUsuario);
  }
}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;
