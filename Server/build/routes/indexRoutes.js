"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexControllers_1 = require("../controllers/indexControllers"); // Asegúrate de que esta ruta sea correcta
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/api/paciente', indexControllers_1.indexController.hello);
        this.router.get('/api/cita', indexControllers_1.indexController.index);
        this.router.get('/api/doctor', indexControllers_1.indexController.index);
        this.router.get('/api/horario', indexControllers_1.indexController.index);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
