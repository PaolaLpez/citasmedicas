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
exports.doctor_especialidadControllers = void 0;
const database_1 = __importDefault(require("../database"));
class doctor_especialidadController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctor_especialidad = yield database_1.default.query('select *  FROM doctor_especialidad');
                res.json(doctor_especialidad);
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
                const doctor_especialidad = Array.isArray(req.body) ? req.body[0] : req.body;
                // Validar que todos los campos requeridos están presentes
                const { id_especialidad, id_doctor } = doctor_especialidad;
                if (!id_especialidad || !id_doctor) {
                    res.status(400).json({ message: 'Datos incompletos' });
                }
                // Mostrar datos recibidos para depuración
                console.log('Received data:', doctor_especialidad);
                // Ejecutar la consulta
                const result = yield database_1.default.query('INSERT INTO doctor_especialidad (id_especialidad, id_doctor) VALUES (?, ?)', [id_especialidad, id_doctor]);
                res.status(201).json({ message: 'Datos de la especialidad del paciente insertados correctamente' });
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
                const { id_doctor, id_especialidad } = req.params;
                yield database_1.default.query('DELETE FROM doctor_especialidad WHERE id_doctor = ? AND id_especialidad = ?', [id_doctor, id_especialidad]);
                res.json({ message: 'Datos de la especialidad del doctor eliminados correctamente' });
            }
            catch (error) {
                console.error('Database query error:', error); // Imprimir el error completo
                res.status(500).send('Error al eliminar los datos del doctor');
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_doctor, id_especialidad } = req.params; // Estos son los valores actuales de la URL
                const { id_doctor: nuevo_id_doctor, id_especialidad: nuevo_id_especialidad } = req.body; // Nuevos valores en el cuerpo de la solicitud
                // Verificar que los nuevos valores estén presentes
                if (!nuevo_id_doctor || !nuevo_id_especialidad) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                // Ejecutar la consulta de actualización
                yield database_1.default.query('UPDATE doctor_especialidad SET id_doctor = ?, id_especialidad = ? WHERE id_doctor = ? AND id_especialidad = ?', [nuevo_id_doctor, nuevo_id_especialidad, id_doctor, id_especialidad]);
                res.json({ message: 'Datos de la especialidad del doctor actualizados correctamente' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al actualizar los datos del doctor');
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_doctor, id_especialidad } = req.params;
                const result = yield database_1.default.query(`SELECT *
             FROM doctor_especialidad 
             WHERE id_doctor = ? AND id_especialidad = ?`, [id_doctor, id_especialidad]);
                res.json(result[0]); // Devolver el primer resultado
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al obtener los datos del doctor_especialidad');
            }
        });
    }
}
exports.doctor_especialidadControllers = new doctor_especialidadController();
