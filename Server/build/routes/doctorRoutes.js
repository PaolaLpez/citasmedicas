"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRoutes = void 0;
const express_1 = require("express");
const doctorControllers_1 = require("../controllers/doctorControllers");
class DoctorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', doctorControllers_1.doctorController.list);
        this.router.get('/especialidad/:id_especialidad', doctorControllers_1.doctorController.getDoctoresByEspecialidad);
        this.router.post('/', doctorControllers_1.doctorController.create);
        this.router.delete('/:id_doctor', doctorControllers_1.doctorController.delete);
        this.router.put('/:id_doctor', doctorControllers_1.doctorController.update);
        this.router.get('/:id_doctor', doctorControllers_1.doctorController.getOne);
    }
}
exports.doctorRoutes = new DoctorRoutes().router;
exports.default = exports.doctorRoutes;
