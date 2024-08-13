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
const database_1 = __importDefault(require("../database")); // Asegúrate de que el pool de conexiones esté correctamente configurado
class DoctorController {
    // Manejar la solicitud POST para agregar un nuevo doctor
    addDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, id_horario, ncmre_doc, tipo_doctor } = req.body;
            // Validar los datos de entrada
            if (!usuario || !id_horario || !ncmre_doc || !tipo_doctor) {
                res.status(400).send('Todos los campos son necesarios');
                return;
            }
            try {
                const sql = 'INSERT INTO doctor (usuario, id_horario, ncmre_doc, tipo_doctor) VALUES (?, ?, ?, ?)';
                const values = [usuario, id_horario, ncmre_doc, tipo_doctor];
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
                console.error('Error al insertar el doctor:', error);
                res.status(500).send('Error al agregar el doctor');
            }
        });
    }
    // Manejar la solicitud GET para obtener todos los doctores
    getDoctors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
            const { usuario, id_horario, ncmre_doc, tipo_doctor } = req.body;
            if (!usuario || !id_horario || !ncmre_doc || !tipo_doctor) {
                res.status(400).send('Todos los campos son necesarios');
                return;
            }
            try {
                const sql = 'UPDATE doctor SET usuario = ?, id_horario = ?, ncmre_doc = ?, tipo_doctor = ? WHERE id_doctor = ?';
                const values = [usuario, id_horario, ncmre_doc, tipo_doctor, id_doctor];
                const [result] = yield database_1.default.query(sql, values);
                if (result.affectedRows === 0) {
                    res.status(404).send('Doctor no encontrado');
                    return;
                }
                res.status(200).send('Doctor actualizado exitosamente');
            }
            catch (error) {
                console.error('Error al actualizar el doctor:', error);
                res.status(500).send('Error al actualizar el doctor');
            }
        });
    }
    // Manejar la solicitud DELETE para eliminar un doctor
    deleteDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_doctor } = req.params;
            try {
                const sql = 'DELETE FROM doctor WHERE id_doctor = ?';
                const [result] = yield database_1.default.query(sql, [id_doctor]);
                if (result.affectedRows === 0) {
                    res.status(404).send('Doctor no encontrado');
                    return;
                }
                res.status(200).send('Doctor eliminado exitosamente');
            }
            catch (error) {
                console.error('Error al eliminar el doctor:', error);
                res.status(500).send('Error al eliminar el doctor');
            }
        });
    }
}
exports.default = DoctorController;
