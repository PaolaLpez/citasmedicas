"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes/routes")); // Asegúrate de que la ruta sea correcta
const app = (0, express_1.default)();
app.use(body_parser_1.default.json()); // Para manejar JSON en el cuerpo de la solicitud
app.use('/api', routes_1.default); // Usar el archivo de rutas
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
