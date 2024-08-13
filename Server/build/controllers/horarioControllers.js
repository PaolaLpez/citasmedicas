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
const database_1 = __importDefault(require("../database")); // Ensure your pool configuration is correct
class HorarioController {
    // Handle POST request to add a new horario
    addHorario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hora_inicio, hora_fin, fecha_inicio, fecha_fin } = req.body;
            // Validate input data
            if (!hora_inicio || !hora_fin || !fecha_inicio || !fecha_fin) {
                res.status(400).send('Todos los campos son necesarios');
                return;
            }
            try {
                const sql = 'INSERT INTO horario (hora_inicio, hora_fin, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)';
                const values = [hora_inicio, hora_fin, fecha_inicio, fecha_fin];
                const [result] = yield database_1.default.query(sql, values);
                // Check if the insert was successful
                if ('insertId' in result) {
                    res.status(201).send(`Horario agregado exitosamente con ID: ${result.insertId}`);
                }
                else {
                    res.status(500).send('Error al obtener el ID del nuevo horario');
                }
            }
            catch (error) {
                console.error('Error al insertar el horario:', error);
                res.status(500).send('Error al agregar el horario');
            }
        });
    }
    // Handle GET request to fetch all horarios
    getHorarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM horario';
                const [results] = yield database_1.default.query(sql);
                res.status(200).json(results);
            }
            catch (error) {
                console.error('Error al obtener horarios:', error);
                res.status(500).send('Error al obtener horarios');
            }
        });
    }
    // Handle PUT request to update a horario
    updateHorario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_horario } = req.params;
            const { hora_inicio, hora_fin, fecha_inicio, fecha_fin } = req.body;
            // Validate input data
            if (!hora_inicio || !hora_fin || !fecha_inicio || !fecha_fin) {
                res.status(400).send('Todos los campos son necesarios');
                return;
            }
            try {
                const sql = 'UPDATE horario SET hora_inicio = ?, hora_fin = ?, fecha_inicio = ?, fecha_fin = ? WHERE id_horario = ?';
                const [result] = yield database_1.default.query(sql, [hora_inicio, hora_fin, fecha_inicio, fecha_fin, id_horario]);
                if (result.affectedRows === 0) {
                    res.status(404).send('Horario no encontrado');
                    return;
                }
                res.status(200).send('Horario actualizado exitosamente');
            }
            catch (error) {
                console.error('Error al actualizar el horario:', error);
                res.status(500).send('Error al actualizar el horario');
            }
        });
    }
    // Handle DELETE request to remove a horario
    deleteHorario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_horario } = req.params;
            try {
                const sql = 'DELETE FROM horario WHERE id_horario = ?';
                const [result] = yield database_1.default.query(sql, [id_horario]);
                if (result.affectedRows === 0) {
                    res.status(404).send('Horario no encontrado');
                    return;
                }
                res.status(200).send('Horario eliminado exitosamente');
            }
            catch (error) {
                console.error('Error al eliminar el horario:', error);
                res.status(500).send('Error al eliminar el horario');
            }
        });
    }
}
exports.default = HorarioController;
