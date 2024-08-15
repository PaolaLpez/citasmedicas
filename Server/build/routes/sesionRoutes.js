"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sesionControllers_1 = require("../controllers/sesionControllers");
const router = express_1.default.Router();
// Ruta para obtener la lista de sesiones
router.get('/', sesionControllers_1.sesionControllers.list);
// Ruta para crear una nueva sesión
router.post('/', sesionControllers_1.sesionControllers.create);
// Ruta para obtener una sesión por usuario
router.get('/:usuario', sesionControllers_1.sesionControllers.getOne);
// Ruta para actualizar una sesión existente
router.put('/:usuario', sesionControllers_1.sesionControllers.update);
// Ruta para eliminar una sesión existente
router.delete('/:usuario', sesionControllers_1.sesionControllers.delete);
exports.default = router;
