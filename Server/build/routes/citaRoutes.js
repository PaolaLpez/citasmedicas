"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citaControllers_1 = require("../controllers/citaControllers");
class CitaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', citaControllers_1.citaController.index);
    }
}
const citaRoutes = new CitaRoutes();
exports.default = citaRoutes.router;
