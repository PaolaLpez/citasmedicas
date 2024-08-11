"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const pool = promise_mysql_1.default.createPool({
    host: 'localhost',
    user: 'root', // Cambia estos valores según tu configuración
    password: 'password', // Cambia estos valores según tu configuración
    database: 'citasmedicas', // Asegúrate de usar el nombre correcto de tu base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.default = pool;
