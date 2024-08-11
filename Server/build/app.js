"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const doctorRoutes_1 = __importDefault(require("./routes/doctorRoutes"));
const citaRoutes_1 = __importDefault(require("./routes/citaRoutes")); // Suponiendo que ya tienes estas rutas
const horarioRoutes_1 = __importDefault(require("./routes/horarioRoutes"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use(body_parser_1.default.json());
// Rutas
app.use('/api/doctor', doctorRoutes_1.default);
app.use('/api/cita', citaRoutes_1.default); // Rutas para citas
app.use('/api/horario', horarioRoutes_1.default);
// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
