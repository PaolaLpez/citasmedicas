"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const horarioControllers_1 = __importDefault(require("../controllers/horarioControllers"));
const router = (0, express_1.Router)();
const horarioController = new horarioControllers_1.default();
// Route to handle POST on /api/horario
router.post('/', horarioController.addHorario);
// Route to get all horarios
router.get('/', horarioController.getHorarios);
// Route to update a horario
router.put('/:id_horario', horarioController.updateHorario);
// Route to delete a horario
router.delete('/:id_horario', horarioController.deleteHorario);
exports.default = router;
