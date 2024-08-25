"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', usuarioController_1.usuarioControllers.registrarUsuario);
        this.router.post('/login', usuarioController_1.usuarioControllers.loginUsuario);
        this.router.get('/especialidad/:id_especialidad', usuarioController_1.usuarioControllers.getDoctoresByEspecialidad);
        this.router.get('/:id_usuario', usuarioController_1.usuarioControllers.getOneUsuario);
        this.router.get('/paciente/id/:id_usuario', usuarioController_1.usuarioControllers.getPacienteId); // Nueva ruta para obtener el ID del paciente
        this.router.get('/paciente/nombre/:id_usuario', usuarioController_1.usuarioControllers.getPacienteNombre); // Nueva ruta para obtener el nombre del paciente
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
