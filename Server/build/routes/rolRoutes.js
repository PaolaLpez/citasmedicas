"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolControllers_1 = require("../controllers/rolControllers");
class RolRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', rolControllers_1.rolControllers.list);
        this.router.post('/', rolControllers_1.rolControllers.create);
        this.router.get('/:id_rol', rolControllers_1.rolControllers.getOne);
        this.router.put('/:id_rol', rolControllers_1.rolControllers.update);
        this.router.delete('/:id_rol', rolControllers_1.rolControllers.delete);
    }
}
const rolRoutes = new RolRoutes();
exports.default = rolRoutes.router;
