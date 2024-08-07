"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citaControllers_1 = __importDefault(require("../controllers/citaControllers"));
const router = (0, express_1.Router)();
const citaController = new citaControllers_1.default();
// Ruta para manejar POST en /api/cita
router.post('/', citaController.addCita);
// Ruta para obtener citas por fecha
router.get('/', citaController.getCitasByFecha);
// Ruta para actualizar el estado de una cita
router.put('/:id_cita', citaController.updateCita);
// Ruta para eliminar una cita
router.delete('/:id_cita', citaController.deleteCita);
exports.default = router;
