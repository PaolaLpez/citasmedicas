"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./keys"));
// Crea un pool de conexiones
const pool = promise_mysql_1.default.createPool(keys_1.default.database);
// Método para obtener una conexión y verificar la conexión
pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    console.log('DB is connected');
}).catch(err => {
    console.error('Error connecting to the database:', err);
});
exports.default = pool;
