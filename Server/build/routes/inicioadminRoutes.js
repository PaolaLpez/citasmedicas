"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inicioadminControllers_1 = require("../controllers/inicioadminControllers");
class InicioAdminRoutes {
    constructor() {
        this.router = (0, express_1.Router)(); // Se crea la propiedad router y se inicializa
        this.config();
    }
    config() {
        // Definir las rutas y asociarlas con los métodos del controlador
        this.router.post('/', inicioadminControllers_1.inicioAdminControllers.create);
        this.router.get('/', inicioadminControllers_1.inicioAdminControllers.list);
        this.router.get('/:id_administrador', inicioadminControllers_1.inicioAdminControllers.getOne);
        this.router.put('/:id_administrador', inicioadminControllers_1.inicioAdminControllers.update);
        this.router.delete('/:id_administrador', inicioadminControllers_1.inicioAdminControllers.delete);
    }
}
// Crear una instancia de la clase y exportar solo el objeto router
const inicioAdminRoutes = new InicioAdminRoutes();
exports.default = inicioAdminRoutes.router;
