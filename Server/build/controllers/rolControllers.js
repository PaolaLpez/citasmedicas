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
exports.rolControllers = void 0;
const database_1 = __importDefault(require("../database"));
class RolController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield database_1.default.query('SELECT * FROM rol');
                res.json(roles);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al consultar la base de datos');
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rol = req.body;
                const { id_rol, tipo_rol } = rol;
                if (!id_rol || !tipo_rol) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                yield database_1.default.query('INSERT INTO rol (id_rol, tipo_rol) VALUES (?, ?)', [id_rol, tipo_rol]);
                res.status(201).json({ message: 'Rol creado con éxito' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al crear el rol');
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_rol } = req.params;
                const result = yield database_1.default.query('SELECT * FROM rol WHERE id_rol = ?', [id_rol]);
                if (result.length > 0) {
                    res.json(result[0]);
                }
                else {
                    res.status(404).send('Rol no encontrado');
                }
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al obtener el rol');
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_rol } = req.params;
                const { tipo_rol } = req.body;
                if (!tipo_rol) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                yield database_1.default.query('UPDATE rol SET tipo_rol = ? WHERE id_rol = ?', [tipo_rol, id_rol]);
                res.json({ message: 'Rol actualizado con éxito' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al actualizar el rol');
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_rol } = req.params;
                yield database_1.default.query('DELETE FROM rol WHERE id_rol = ?', [id_rol]);
                res.json({ message: 'Rol eliminado con éxito' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al eliminar el rol');
            }
        });
    }
}
exports.rolControllers = new RolController();
