"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pacienteController_1 = __importDefault(require("../controllers/pacienteController"));
const router = (0, express_1.Router)();
const pacienteController = new pacienteController_1.default();
// Ruta para agregar un nuevo paciente
router.post('/', pacienteController.addPaciente);
// Ruta para obtener todos los pacientes
router.get('/', pacienteController.getPacientes);
// Ruta para obtener un paciente por ID
router.get('/:id_paciente', pacienteController.getPacienteById);
// Ruta para actualizar un paciente
router.put('/:id_paciente', pacienteController.updatePaciente);
// Ruta para eliminar un paciente
router.delete('/:id_paciente', pacienteController.deletePaciente);
exports.default = router;
