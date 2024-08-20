"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pacienteControllers_1 = require("../controllers/pacienteControllers");
class PacienteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', pacienteControllers_1.pacienteControllers.list);
        this.router.post('/', pacienteControllers_1.pacienteControllers.create);
        this.router.delete('/:id_paciente', pacienteControllers_1.pacienteControllers.delete);
        this.router.put('/:id_paciente', pacienteControllers_1.pacienteControllers.update);
        this.router.get('/:id_paciente', pacienteControllers_1.pacienteControllers.getOne);
    }
}
const pacienteRoutes = new PacienteRoutes();
exports.default = pacienteRoutes.router;
