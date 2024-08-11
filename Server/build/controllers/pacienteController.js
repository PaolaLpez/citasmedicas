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
const database_1 = __importDefault(require("../database"));
class PacienteController {
    // Agregar un nuevo paciente
    addPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, padecimiento, curp, num_telefono, correo_electronico } = req.body;
            try {
                const sql = 'INSERT INTO paciente (usuario, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, padecimiento, curp, num_telefono, correo_electronico) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                const values = [usuario, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, padecimiento, curp, num_telefono, correo_electronico];
                const result = yield database_1.default.query(sql, values);
                res.status(201).send(`Paciente agregado exitosamente con ID: ${result.insertId}`);
            }
            catch (error) {
                console.error('Error al insertar el paciente:', error);
                res.status(500).send('Error al agregar el paciente');
            }
        });
    }
    // Obtener todos los pacientes
    getPacientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM paciente';
                const result = yield database_1.default.query(sql);
                res.status(200).json(result);
            }
            catch (error) {
                console.error('Error al obtener pacientes:', error);
                res.status(500).send('Error al obtener pacientes');
            }
        });
    }
    // Obtener un paciente por ID
    getPacienteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_paciente } = req.params;
            try {
                const sql = 'SELECT * FROM paciente WHERE id_paciente = ?';
                const result = yield database_1.default.query(sql, [id_paciente]);
                if (result.length > 0) {
                    res.status(200).json(result[0]);
                }
                else {
                    res.status(404).send('Paciente no encontrado');
                }
            }
            catch (error) {
                console.error('Error al obtener el paciente:', error);
                res.status(500).send('Error al obtener el paciente');
            }
        });
    }
    // Actualizar un paciente
    updatePaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_paciente } = req.params;
            const { usuario, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, padecimiento, curp, num_telefono, correo_electronico } = req.body;
            try {
                const sql = 'UPDATE paciente SET usuario = ?, nom_paciente = ?, fecha_nac = ?, genero = ?, direccion = ?, tipo_sangre = ?, padecimiento = ?, curp = ?, num_telefono = ?, correo_electronico = ? WHERE id_paciente = ?';
                const result = yield database_1.default.query(sql, [usuario, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, padecimiento, curp, num_telefono, correo_electronico, id_paciente]);
                if (result.affectedRows > 0) {
                    res.status(200).send('Paciente actualizado exitosamente');
                }
                else {
                    res.status(404).send('Paciente no encontrado');
                }
            }
            catch (error) {
                console.error('Error al actualizar el paciente:', error);
                res.status(500).send('Error al actualizar el paciente');
            }
        });
    }
    // Eliminar un paciente
    deletePaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_paciente } = req.params;
            try {
                const sql = 'DELETE FROM paciente WHERE id_paciente = ?';
                const result = yield database_1.default.query(sql, [id_paciente]);
                if (result.affectedRows > 0) {
                    res.status(200).send('Paciente eliminado exitosamente');
                }
                else {
                    res.status(404).send('Paciente no encontrado');
                }
            }
            catch (error) {
                console.error('Error al eliminar el paciente:', error);
                res.status(500).send('Error al eliminar el paciente');
            }
        });
    }
}
exports.default = PacienteController;
