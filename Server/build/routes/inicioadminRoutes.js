"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inicioadminControllers_1 = require("../controllers/inicioadminControllers");
const router = (0, express_1.Router)();
// Ruta para crear un nuevo administrador
router.post('/', inicioadminControllers_1.inicioAdminControllers.create);
// Ruta para obtener todos los administradores
router.get('/', inicioadminControllers_1.inicioAdminControllers.list);
// Ruta para obtener un administrador por ID
router.get('/:id_administrador', inicioadminControllers_1.inicioAdminControllers.getOne);
// Ruta para actualizar un administrador existente
router.put('/:id_administrador', inicioadminControllers_1.inicioAdminControllers.update);
// Ruta para eliminar un administrador existente
router.delete('/:id_administrador', inicioadminControllers_1.inicioAdminControllers.delete);
exports.default = router;
