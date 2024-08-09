"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexControllers_1 = require("../controllers/indexControllers");
class IndexRoutes {
    //y se inicializa esta propiedad en la misma línea de código. 
    constructor() {
        this.router = (0, express_1.Router)(); //Se está creando la propiedad que guardara el objeto devuelto 
        this.config();
    }
    config() {
        this.router.get('/', indexControllers_1.indexController.index); //Creando una ruta de mi aplicación del servidor para  
        //la ruta inicial y se devuelve el mensaje Hello.
        /* this.router.delete('/:Id',inventarioController.delete); //aquí se indica que recibe como parámetro
        el id  del juego para poder eliminarlo. */
    }
}
const indexRoutes = new IndexRoutes;
exports.default = indexRoutes.router;
