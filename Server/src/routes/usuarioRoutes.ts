import { Router } from 'express';
import { usuarioControllers } from '../controllers/usuarioController';

class UsuarioRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post('/', usuarioControllers.registrarUsuario);
    this.router.post('/login', usuarioControllers.loginUsuario);
    this.router.get('/especialidad/:id_especialidad', usuarioControllers.getDoctoresByEspecialidad);
    this.router.get('/paciente/id/:id_usuario', usuarioControllers.getPacienteId); // Nueva ruta para obtener el ID del paciente
    this.router.get('/paciente/nombre/:id_usuario', usuarioControllers.getPacienteNom); // Nueva ruta para obtener el nombre del paciente
  }
}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;
