"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pacienteControllers_1 = require("../controllers/pacienteControllers");
class PacienteRoutes {
    // devuelto y se inicializa esta propiedad en la misma línea de código. 
    constructor() {
        this.router = (0, express_1.Router)(); // Se está creando la propiedad que guardara el objeto
        this.config();
    }
    config() {
        this.router.get('/', pacienteControllers_1.pacienteControllers.getOne);
        this.router.post('/', pacienteControllers_1.pacienteControllers.create);
        this.router.delete('/:id', pacienteControllers_1.pacienteControllers.delete);
        this.router.put('/:id', pacienteControllers_1.pacienteControllers.update);
        this.router.get('/:id', pacienteControllers_1.pacienteControllers.getOne);
    }
}
const pacienteRoutes = new PacienteRoutes();
exports.default = pacienteRoutes.router;
