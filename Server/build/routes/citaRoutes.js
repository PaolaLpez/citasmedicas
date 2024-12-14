"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.citaRoutes = void 0;
const express_1 = require("express");
const citaControllers_1 = require("../controllers/citaControllers");
class CitaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', citaControllers_1.citaController.list);
        this.router.post('/', citaControllers_1.citaController.create);
        this.router.delete('/:id_cita', citaControllers_1.citaController.delete);
        this.router.put('/:id_cita', citaControllers_1.citaController.update);
        this.router.get('/:id_cita', citaControllers_1.citaController.getOne);
        this.router.get('/horas-ocupadas', citaControllers_1.citaController.getHorasOcupadas);
    }
}
exports.citaRoutes = new CitaRoutes().router;
exports.default = exports.citaRoutes;
