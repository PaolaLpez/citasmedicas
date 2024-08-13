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
    // Método para crear un nuevo administrador
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { usuario, id_doctor, nombre_adm } = req.body;
                if (!usuario || !id_doctor || !nombre_adm) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                // Verificar si el usuario ya existe en la tabla sesion
                const [usuarioExists] = yield database_1.default.query('SELECT * FROM sesion WHERE usuario = ?', [usuario]);
                if (usuarioExists.length === 0) {
                    res.status(400).json({ message: 'El usuario no existe en la tabla sesion' });
                    return;
                }
                // Verificar si el id_doctor existe en la tabla doctor
                const [doctorExists] = yield database_1.default.query('SELECT * FROM doctor WHERE id_doctor = ?', [id_doctor]);
                if (doctorExists.length === 0) {
                    res.status(400).json({ message: 'El ID de doctor no existe' });
                    return;
                }
                // Insertar nuevo administrador
                yield database_1.default.query('INSERT INTO administrador (usuario, id_doctor, nombre_adm) VALUES (?, ?, ?)', [usuario, id_doctor, nombre_adm]);
                res.status(201).json({ message: 'Administrador creado con éxito' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ message: 'Error al crear administrador' });
            }
        });
    }
    // Método para listar todos los administradores
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
    // Método para obtener un administrador por ID
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_administrador } = req.params;
                const [result] = yield database_1.default.query('SELECT * FROM administrador WHERE id_administrador = ?', [id_administrador]);
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
    // Método para actualizar un administrador existente
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_administrador } = req.params;
                const { usuario, id_doctor, nombre_adm } = req.body;
                if (!usuario || !id_doctor || !nombre_adm) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                // Verificar si el id_administrador existe
                const [adminExists] = yield database_1.default.query('SELECT * FROM administrador WHERE id_administrador = ?', [id_administrador]);
                if (adminExists.length === 0) {
                    res.status(404).json({ message: 'Administrador no encontrado' });
                    return;
                }
                // Verificar si el usuario existe en la tabla sesion
                const [usuarioExists] = yield database_1.default.query('SELECT * FROM sesion WHERE usuario = ?', [usuario]);
                if (usuarioExists.length === 0) {
                    res.status(400).json({ message: 'El usuario no existe en la tabla sesion' });
                    return;
                }
                // Verificar si el id_doctor existe en la tabla doctor
                const [doctorExists] = yield database_1.default.query('SELECT * FROM doctor WHERE id_doctor = ?', [id_doctor]);
                if (doctorExists.length === 0) {
                    res.status(400).json({ message: 'El ID de doctor no existe' });
                    return;
                }
                // Actualizar administrador
                yield database_1.default.query('UPDATE administrador SET usuario = ?, id_doctor = ?, nombre_adm = ? WHERE id_administrador = ?', [usuario, id_doctor, nombre_adm, id_administrador]);
                res.json({ message: 'Administrador actualizado con éxito' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).json({ message: 'Error al actualizar administrador' });
            }
        });
    }
    // Método para eliminar un administrador existente
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_administrador } = req.params;
                // Verificar si el id_administrador existe
                const [adminExists] = yield database_1.default.query('SELECT * FROM administrador WHERE id_administrador = ?', [id_administrador]);
                if (adminExists.length === 0) {
                    res.status(404).json({ message: 'Administrador no encontrado' });
                    return;
                }
                // Eliminar administrador
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
