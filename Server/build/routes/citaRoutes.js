"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citaControllers_1 = require("../controllers/citaControllers");
const router = (0, express_1.Router)();
// Ruta para manejar POST en /api/cita
router.post('/', citaControllers_1.citaController.addCita);
// Ruta para obtener citas por fecha
router.get('/', citaControllers_1.citaController.getCitasByFecha);
// Ruta para actualizar el estado de una cita
router.put('/:id_cita', citaControllers_1.citaController.updateCita);
// Ruta para eliminar una cita
router.delete('/:id_cita', citaControllers_1.citaController.deleteCita);
exports.default = router;
