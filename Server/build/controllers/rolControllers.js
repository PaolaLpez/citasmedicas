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
const database_1 = __importDefault(require("../database")); // Asegúrate de que la ruta al archivo de conexión sea correcta
class RolController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield database_1.default.query('SELECT * FROM rol');
                res.json(roles);
            }
            catch (error) {
                console.error('Error al consultar la base de datos:', error);
                res.status(500).json({ message: 'Error al consultar la base de datos', error });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_rol, tipo_rol } = req.body;
                // Validar datos
                if (!id_rol || !tipo_rol) {
                    res.status(400).json({ message: 'Datos incompletos: id_rol y tipo_rol son requeridos' });
                    return;
                }
                // Verificar si el rol ya existe
                const existingRole = yield database_1.default.query('SELECT * FROM rol WHERE id_rol = ?', [id_rol]);
                if (existingRole.length > 0) {
                    res.status(409).json({ message: 'El rol ya existe' });
                    return;
                }
                yield database_1.default.query('INSERT INTO rol (id_rol, tipo_rol) VALUES (?, ?)', [id_rol, tipo_rol]);
                res.status(201).json({ message: 'Rol creado con éxito' });
            }
            catch (error) {
                console.error('Error al crear el rol:', error);
                res.status(500).json({ message: 'Error al crear el rol', error });
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
                    res.status(404).json({ message: 'Rol no encontrado' });
                }
            }
            catch (error) {
                console.error('Error al obtener el rol:', error);
                res.status(500).json({ message: 'Error al obtener el rol', error });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_rol } = req.params;
                const { tipo_rol } = req.body;
                // Validar datos
                if (!tipo_rol) {
                    res.status(400).json({ message: 'Datos incompletos: tipo_rol es requerido' });
                    return;
                }
                // Verificar si el rol existe
                const existingRole = yield database_1.default.query('SELECT * FROM rol WHERE id_rol = ?', [id_rol]);
                if (existingRole.length === 0) {
                    res.status(404).json({ message: 'Rol no encontrado' });
                    return;
                }
                yield database_1.default.query('UPDATE rol SET tipo_rol = ? WHERE id_rol = ?', [tipo_rol, id_rol]);
                res.json({ message: 'Rol actualizado con éxito' });
            }
            catch (error) {
                console.error('Error al actualizar el rol:', error);
                res.status(500).json({ message: 'Error al actualizar el rol', error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_rol } = req.params;
                // Verificar si el rol existe
                const existingRole = yield database_1.default.query('SELECT * FROM rol WHERE id_rol = ?', [id_rol]);
                if (existingRole.length === 0) {
                    res.status(404).json({ message: 'Rol no encontrado' });
                    return;
                }
                yield database_1.default.query('DELETE FROM rol WHERE id_rol = ?', [id_rol]);
                res.json({ message: 'Rol eliminado con éxito' });
            }
            catch (error) {
                console.error('Error al eliminar el rol:', error);
                res.status(500).json({ message: 'Error al eliminar el rol', error });
            }
        });
    }
}
exports.rolControllers = new RolController();
