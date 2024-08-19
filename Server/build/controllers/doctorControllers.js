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
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
<<<<<<< HEAD
            const { id_especialidad, id_horario, nombre_doc, tipo_doctor, correo_electronico, contrasena } = req.body;
            // Validar los datos de entrada
            if (!id_especialidad || !id_horario || !nombre_doc || !tipo_doctor || !correo_electronico || !contrasena || !tipo_doctor) {
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
=======
            try {
                const doctors = yield database_1.default.query('SELECT * FROM doctor');
                res.json(doctors);
>>>>>>> b93385d7b90b9818b3f90007f8d236c80f3f0468
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
<<<<<<< HEAD
                const sql = 'SELECT * FROM doctor';
                const [results] = yield database_1.default.query(sql);
                res.status(200).json(results);
            }
            catch (error) {
                console.error('Error al obtener los doctores:', error);
                res.status(500).send('Error al obtener los doctores');
            }
        });
    }
    // Manejar la solicitud PUT para actualizar un doctor
    updateDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_doctor } = req.params;
            const { id_especialidad, id_horario, nombre_doc, tipo_doctor, correo_electronico, contrasena } = req.body;
            if (!id_especialidad || !id_horario || !nombre_doc || !tipo_doctor || !correo_electronico || !contrasena || !tipo_doctor) {
                res.status(400).send('Todos los campos son necesarios');
                return;
            }
            try {
                const sql = 'UPDATE doctor SET usuario = ?, id_horario = ?, ncmre_doc = ?, tipo_doctor = ? WHERE id_doctor = ?';
                const values = [id_especialidad, id_horario, nombre_doc, tipo_doctor, correo_electronico, contrasena];
                const [result] = yield database_1.default.query(sql, values);
                if (result.affectedRows === 0) {
                    res.status(404).send('Doctor no encontrado');
=======
                const doctor = Array.isArray(req.body) ? req.body[0] : req.body;
                const { usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor } = doctor;
                if (!usuario || !id_especialidad || !id_horario || !nombre_doc || !tipo_doctor) {
                    res.status(400).json({ message: 'Datos incompletos' });
>>>>>>> b93385d7b90b9818b3f90007f8d236c80f3f0468
                    return;
                }
                console.log('Received data:', doctor);
                const result = yield database_1.default.query('INSERT INTO doctor (usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor) VALUES (?, ?, ?, ?, ?)', [usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor]);
                res.status(201).json({ message: 'Doctor insertado' });
            }
            catch (error) {
                console.error('Database query error:', error); // Imprimir el error completo
                if (!res.headersSent) {
                    res.status(500).json({ message: 'Error al insertar en la base de datos' });
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_doctor } = req.params;
                yield database_1.default.query('DELETE FROM doctor WHERE id_doctor = ?', [id_doctor]);
                res.json({ message: 'Doctor eliminado' });
            }
            catch (error) {
                console.error('Database query error:', error); // Imprimir el error completo
                res.status(500).send('Error al eliminar el doctor');
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_doctor } = req.params;
                const { usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor } = req.body;
                if (!usuario || !id_especialidad || !id_horario || !nombre_doc || !tipo_doctor) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                const result = yield database_1.default.query('UPDATE doctor SET usuario = ?, id_especialidad = ?, id_horario = ?, nombre_doc = ?, tipo_doctor = ? WHERE id_doctor = ?', [usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor, id_doctor]);
                res.json({ message: 'Doctor actualizado' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al actualizar el doctor');
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_doctor } = req.params;
                const result = yield database_1.default.query('SELECT * FROM doctor WHERE id_doctor = ?', [id_doctor]);
                res.json(result);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al consultar el doctor');
            }
        });
    }
}
exports.doctorController = new DoctorController();
