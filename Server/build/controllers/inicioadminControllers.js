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
exports.inicioAdminControllers = void 0;
const database_1 = __importDefault(require("../database"));
class InicioAdminController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { usuario, id_doctor, nombre_adm } = req.body;
                if (!usuario || !id_doctor || !nombre_adm) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                yield database_1.default.query('INSERT INTO administrador (usuario, id_doctor, nombre_adm) VALUES (?, ?, ?)', [usuario, id_doctor, nombre_adm]);
                res.status(201).json({ message: 'Administrador creado con éxito' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ message: 'Error al crear administrador' });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admins = yield database_1.default.query('SELECT * FROM administrador');
                res.json(admins);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ message: 'Error al consultar administradores' });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_administrador } = req.params;
                const result = yield database_1.default.query('SELECT * FROM administrador WHERE id_administrador = ?', [id_administrador]);
                if (result.length === 0) {
                    res.status(404).json({ message: 'Administrador no encontrado' });
                    return;
                }
                res.json(result[0]);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ message: 'Error al obtener administrador' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_administrador } = req.params;
                const { usuario, id_doctor, nombre_adm } = req.body;
                if (!usuario || !id_doctor || !nombre_adm) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                yield database_1.default.query('UPDATE administrador SET usuario = ?, id_doctor = ?, nombre_adm = ? WHERE id_administrador = ?', [usuario, id_doctor, nombre_adm, id_administrador]);
                res.json({ message: 'Administrador actualizado con éxito' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ message: 'Error al actualizar administrador' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_administrador } = req.params;
                yield database_1.default.query('DELETE FROM administrador WHERE id_administrador = ?', [id_administrador]);
                res.json({ message: 'Administrador eliminado con éxito' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ message: 'Error al eliminar administrador' });
            }
        });
    }
}
exports.inicioAdminControllers = new InicioAdminController();
