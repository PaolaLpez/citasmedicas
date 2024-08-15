"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.horarioRoutes = void 0;
const express_1 = require("express");
const horarioControllers_1 = require("../controllers/horarioControllers");
class HorarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', horarioControllers_1.horarioController.list);
        this.router.post('/', horarioControllers_1.horarioController.create);
        this.router.delete('/:id_horario', horarioControllers_1.horarioController.delete);
        this.router.put('/:id_horario', horarioControllers_1.horarioController.update);
        this.router.get('/:id_horario', horarioControllers_1.horarioController.getOne);
    }
}
exports.horarioRoutes = new HorarioRoutes().router;
exports.default = exports.horarioRoutes;
