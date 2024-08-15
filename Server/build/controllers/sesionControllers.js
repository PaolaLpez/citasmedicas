"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sesionControllers = void 0;
const database_1 = __importDefault(require("../database"));
class SesionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sesiones = yield database_1.default.query('SELECT * FROM sesion');
                res.json(sesiones);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al consultar las sesiones');
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sesion = req.body;
                const { usuario, id_rol, contraseña } = sesion;
                if (!usuario || !id_rol || !contraseña) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                yield database_1.default.query('INSERT INTO sesion (usuario, id_rol, contraseña) VALUES (?, ?, ?)', [usuario, id_rol, contraseña]);
                res.status(201).json({ message: 'Sesión creada con éxito' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al crear la sesión');
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { usuario } = req.params;
                const result = yield database_1.default.query('SELECT * FROM sesion WHERE usuario = ?', [usuario]);
                if (result.length > 0) {
                    res.json(result[0]);
                }
                else {
                    res.status(404).send('Sesión no encontrada');
                }
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al obtener la sesión');
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { usuario } = req.params;
                const { id_rol, contraseña } = req.body;
                if (!id_rol || !contraseña) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                yield database_1.default.query('UPDATE sesion SET id_rol = ?, contraseña = ? WHERE usuario = ?', [id_rol, contraseña, usuario]);
                res.json({ message: 'Sesión actualizada con éxito' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al actualizar la sesión');
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { usuario } = req.params;
                yield database_1.default.query('DELETE FROM sesion WHERE usuario = ?', [usuario]);
                res.json({ message: 'Sesión eliminada con éxito' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al eliminar la sesión');
            }
        });
    }
}
exports.sesionControllers = new SesionController();
