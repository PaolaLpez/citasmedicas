"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctor_especialidadControllers_1 = require("../controllers/doctor_especialidadControllers");
class Doctor_EspecialidadRoutes {
    // devuelto y se inicializa esta propiedad en la misma línea de código. 
    constructor() {
        this.router = (0, express_1.Router)(); // Se está creando la propiedad que guardara el objeto
        this.config();
    }
    config() {
        this.router.get('/', doctor_especialidadControllers_1.doctor_especialidadControllers.list);
        this.router.post('/', doctor_especialidadControllers_1.doctor_especialidadControllers.create);
        this.router.delete('/:id_doctor_especialidad', doctor_especialidadControllers_1.doctor_especialidadControllers.delete);
        this.router.put('/:id_doctor_especialidad', doctor_especialidadControllers_1.doctor_especialidadControllers.update);
        this.router.get('/:id_doctor_especialidad', doctor_especialidadControllers_1.doctor_especialidadControllers.getOne);
    }
}
const doctor_especialidadRoutes = new Doctor_EspecialidadRoutes();
exports.default = doctor_especialidadRoutes.router;
