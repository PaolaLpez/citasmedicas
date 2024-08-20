"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sesionControllers_1 = require("../controllers/sesionControllers");
class SesionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', sesionControllers_1.sesionControllers.list);
        this.router.post('/', sesionControllers_1.sesionControllers.create);
        this.router.get('/:usuario', sesionControllers_1.sesionControllers.getOne);
        this.router.put('/:usuario', sesionControllers_1.sesionControllers.update);
        this.router.delete('/:usuario', sesionControllers_1.sesionControllers.delete);
    }
}
const sesionRoutes = new SesionRoutes();
exports.default = sesionRoutes.router;
