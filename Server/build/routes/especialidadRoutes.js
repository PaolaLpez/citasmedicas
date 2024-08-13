"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const especialidadControllers_1 = require("../controllers/especialidadControllers");
class EspecialidadRoutes {
    // devuelto y se inicializa esta propiedad en la misma línea de código. 
    constructor() {
        this.router = (0, express_1.Router)(); // Se está creando la propiedad que guardara el objeto
        this.config();
    }
    config() {
        this.router.get('/', especialidadControllers_1.especialidadControllers.list);
        this.router.post('/', especialidadControllers_1.especialidadControllers.create);
        this.router.delete('/:id_especialidad', especialidadControllers_1.especialidadControllers.delete);
        this.router.put('/:id_especialidad', especialidadControllers_1.especialidadControllers.update);
        this.router.get('/:id_especialidad', especialidadControllers_1.especialidadControllers.getOne);
    }
}
const especialidadRoutes = new EspecialidadRoutes();
exports.default = especialidadRoutes.router;
