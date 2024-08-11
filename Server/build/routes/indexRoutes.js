"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, resp) => resp.send('Hello')); //Creando una ruta para mi aplicación del servidor para la ruta inicial y se devuelve el mensaje Hello
    }
}
const indexRoutes = new IndexRoutes;
exports.default = indexRoutes.router;
