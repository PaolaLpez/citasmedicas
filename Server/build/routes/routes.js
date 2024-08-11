"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctorRoutes_1 = __importDefault(require("./doctorRoutes")); // Ruta correcta al archivo de rutas para doctores
const citaRoutes_1 = __importDefault(require("./citaRoutes")); // Supuesto archivo de rutas para citas
const horarioRoutes_1 = __importDefault(require("./horarioRoutes"));
const router = (0, express_1.Router)();
// Usar las rutas para doctores
router.use('/api', doctorRoutes_1.default);
// Usar las rutas para citas
router.use('/api', citaRoutes_1.default);
router.use('/api', horarioRoutes_1.default);
exports.default = router;
