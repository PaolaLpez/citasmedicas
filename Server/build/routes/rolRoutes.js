"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rolControllers_1 = require("../controllers/rolControllers"); // Asegúrate de que la ruta al controlador sea correcta
const router = express_1.default.Router();
// Ruta para obtener la lista de roles
router.get('/', rolControllers_1.rolControllers.list);
// Ruta para crear un nuevo rol
router.post('/', rolControllers_1.rolControllers.create);
// Ruta para obtener un rol por ID
router.get('/:id_rol', rolControllers_1.rolControllers.getOne);
// Ruta para actualizar un rol existente
router.put('/:id_rol', rolControllers_1.rolControllers.update);
// Ruta para eliminar un rol existente
router.delete('/:id_rol', rolControllers_1.rolControllers.delete);
exports.default = router;
