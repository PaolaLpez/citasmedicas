"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctorControllers_1 = __importDefault(require("../controllers/doctorControllers"));
const router = (0, express_1.Router)();
const doctorController = new doctorControllers_1.default();
// Ruta para manejar POST en /api/doctor
router.post('/', doctorController.addDoctor);
// Ruta para obtener todos los doctores
router.get('/', doctorController.getDoctors);
// Ruta para actualizar un doctor
router.put('/:id_doctor', doctorController.updateDoctor);
// Ruta para eliminar un doctor
router.delete('/:id_doctor', doctorController.deleteDoctor);
exports.default = router;
