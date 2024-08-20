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
exports.doctorController = void 0;
const database_1 = __importDefault(require("../database"));
class DoctorController {
    // Manejar la solicitud POST para agregar un nuevo doctor
    addDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_especialidad, id_horario, nombre_doc, tipo_doctor, correo_electronico, contrasena } = req.body;
            // Validar los datos de entrada
            if (!id_especialidad || !id_horario || !nombre_doc || !tipo_doctor || !correo_electronico || !contrasena) {
                res.status(400).send('Todos los campos son necesarios');
                return;
            }
            try {
                const sql = 'INSERT INTO doctor (id_especialidad, id_horario, nombre_doc, tipo_doctor, correo_electronico, contrasena) VALUES (?, ?, ?, ?, ?, ?)';
                const values = [id_especialidad, id_horario, nombre_doc, tipo_doctor, correo_electronico, contrasena];
                const [result] = yield database_1.default.query(sql, values);
                // Verifica si la consulta se realizó correctamente
                if ('insertId' in result) {
                    res.status(201).send(`Doctor agregado exitosamente con ID: ${result.insertId}`);
                }
                else {
                    res.status(500).send('Error al obtener el ID del nuevo doctor');
                }
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al agregar el doctor');
            }
        });
    }
    // Manejar la solicitud GET para listar todos los doctores
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [doctors] = yield database_1.default.query('SELECT * FROM doctor');
                res.json(doctors);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al consultar la base de datos');
            }
        });
    }
    // Manejar la solicitud POST para crear un nuevo doctor (duplicado, por lo tanto, se recomienda eliminar o consolidar con addDoctor)
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctor = Array.isArray(req.body) ? req.body[0] : req.body;
                const { usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor } = doctor;
                if (!usuario || !id_especialidad || !id_horario || !nombre_doc || !tipo_doctor) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                console.log('Received data:', doctor);
                const result = yield database_1.default.query('INSERT INTO doctor (usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor) VALUES (?, ?, ?, ?, ?)', [usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor]);
                res.status(201).json({ message: 'Doctor insertado' });
            }
            catch (error) {
                console.error('Database query error:', error);
                if (!res.headersSent) {
                    res.status(500).json({ message: 'Error al insertar en la base de datos' });
                }
            }
        });
    }
    // Manejar la solicitud DELETE para eliminar un doctor
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_doctor } = req.params;
                const [result] = yield database_1.default.query('DELETE FROM doctor WHERE id_doctor = ?', [id_doctor]);
                if (result.affectedRows === 0) {
                    res.status(404).send('Doctor no encontrado');
                }
                else {
                    res.json({ message: 'Doctor eliminado' });
                }
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al eliminar el doctor');
            }
        });
    }
    // Manejar la solicitud PUT para actualizar un doctor
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_doctor } = req.params;
                const { usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor } = req.body;
                if (!usuario || !id_especialidad || !id_horario || !nombre_doc || !tipo_doctor) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                const [result] = yield database_1.default.query('UPDATE doctor SET usuario = ?, id_especialidad = ?, id_horario = ?, nombre_doc = ?, tipo_doctor = ? WHERE id_doctor = ?', [usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor, id_doctor]);
                if (result.affectedRows === 0) {
                    res.status(404).send('Doctor no encontrado');
                }
                else {
                    res.json({ message: 'Doctor actualizado' });
                }
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al actualizar el doctor');
            }
        });
    }
    // Manejar la solicitud GET para obtener un doctor específico
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_doctor } = req.params;
                const [result] = yield database_1.default.query('SELECT * FROM doctor WHERE id_doctor = ?', [id_doctor]);
                if (result.length === 0) {
                    res.status(404).send('Doctor no encontrado');
                }
                else {
                    res.json(result);
                }
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al consultar el doctor');
            }
        });
    }
}
exports.doctorController = new DoctorController();
