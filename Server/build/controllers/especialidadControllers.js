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
exports.especialidadControllers = void 0;
const database_1 = __importDefault(require("../database"));
class EspecialidadController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.default.query('select * from especialidad');
                res.json(result);
            }
            catch (error) {
                console.error('Database query error:', error); // Imprimir el error completo
                res.status(500).send('Error al consultar la base de datos');
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Asumir que req.body es un array de objetos y tomar el primer objeto
                const resultado = Array.isArray(req.body) ? req.body[0] : req.body;
                // Validar que todos los campos requeridos están presentes
                const { id_especialidad, nombre_especialidad } = resultado;
                if (!id_especialidad || !nombre_especialidad) {
                    res.status(400).json({ message: 'Datos incompletos' });
                }
                // Mostrar datos recibidos para depuración
                console.log('Received data:', resultado);
                // Ejecutar la consulta
                const result = yield database_1.default.query('INSERT INTO especialidad (id_especialidad, nombre_especialidad) VALUES (?, ?)', [id_especialidad, nombre_especialidad]);
                res.status(201).json({ message: 'Datos de la especialidad insertados' });
            }
            catch (error) {
                console.error('Database query error:', error); // Imprimir el error completo
                if (!res.headersSent) {
                    res.status(500).json({ message: 'Error al consultar la base de datos' });
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_especialidad } = req.params;
                yield database_1.default.query('DELETE FROM especialidad WHERE id_especialidad =?', [id_especialidad]);
                res.json({ message: 'Datos de la especialidad eliminados' });
            }
            catch (error) {
                console.error('Database query error:', error); // Imprimir el error completo
                res.status(500).send('Error al eliminar los datos de la especialidad');
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_especialidad, nombre_especialidad } = req.body;
                // Verifica si todos los campos necesarios están presentes
                if (!id_especialidad || !nombre_especialidad) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                const result = yield database_1.default.query('UPDATE especialidad SET nombre_especialidad=? WHERE id_especialidad=?', [nombre_especialidad, id_especialidad]);
                res.json({ message: 'Datos de la especialidad actualizados' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al actualizar los datos de la especialidad');
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_especialidad } = req.params; //Se recupera el id del params
                const result = yield database_1.default.query('SELECT * FROM especialidad WHERE id_especialidad=?', [id_especialidad]);
                res.json(result);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error la especialidad no existe');
            }
        });
    }
}
exports.especialidadControllers = new EspecialidadController();
