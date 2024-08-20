"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inicioadminControllers_1 = require("../controllers/inicioadminControllers");
class InicioAdminRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', inicioadminControllers_1.inicioAdminControllers.create);
        this.router.get('/', inicioadminControllers_1.inicioAdminControllers.list);
        this.router.get('/:id_administrador', inicioadminControllers_1.inicioAdminControllers.getOne);
        this.router.put('/:id_administrador', inicioadminControllers_1.inicioAdminControllers.update);
        this.router.delete('/:id_administrador', inicioadminControllers_1.inicioAdminControllers.delete);
    }
}
const inicioAdminRoutes = new InicioAdminRoutes();
exports.default = inicioAdminRoutes.router;
