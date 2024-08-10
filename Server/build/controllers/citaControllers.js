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
class CitaController {
    // Manejar la solicitud POST para agregar una nueva cita
    addCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_paciente, id_doctor, fecha, hora, estado } = req.body;
            try {

                const sql = 'INSERT INTO cita (id_paciente, id_doctor, fecha, hora, estado) VALUES (?, ?, ?, ?, ?)';
                const values = [id_paciente, id_doctor, fecha, hora, estado];
                const result = yield database_1.default.query(sql, values);
                res.status(201).send(`Cita agregada exitosamente con ID: ${result.insertId}`);

            }
            catch (error) {
                console.error('Error al insertar la cita:', error);
                res.status(500).send('Error al agregar la cita');
            }
        });
    }
    // Manejar la solicitud GET para obtener citas por fecha
    getCitasByFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fecha } = req.query;
            try {
                const sql = 'SELECT * FROM cita WHERE fecha = ?';
                const result = yield database_1.default.query(sql, [fecha]);
                res.status(200).json(result);
            }
            catch (error) {
                console.error('Error al obtener citas:', error);
                res.status(500).send('Error al obtener citas');
            }
        });
    }
    // Manejar la solicitud PUT para actualizar el estado de una cita
    updateCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cita } = req.params;
            const { estado } = req.body;
            try {
                const sql = 'UPDATE cita SET estado = ? WHERE id_cita = ?';
                yield database_1.default.query(sql, [estado, id_cita]);
                res.status(200).send('Cita actualizada exitosamente');
            }
            catch (error) {
                console.error('Error al actualizar la cita:', error);
                res.status(500).send('Error al actualizar la cita');
            }
        });
    }
    // Manejar la solicitud DELETE para eliminar una cita
    deleteCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cita } = req.params;
            try {
                const sql = 'DELETE FROM cita WHERE id_cita = ?';
                yield database_1.default.query(sql, [id_cita]);
                res.status(200).send('Cita eliminada exitosamente');
            }
            catch (error) {
                console.error('Error al eliminar la cita:', error);
                res.status(500).send('Error al eliminar la cita');
            }
        });
    }
}
exports.default = CitaController;
