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
exports.horarioController = void 0;
const database_1 = __importDefault(require("../database"));
class HorarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const horarios = yield database_1.default.query('SELECT * FROM horario');
                res.json(horarios);
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
                const horario = Array.isArray(req.body) ? req.body[0] : req.body;
                const { hora_inicio, hora_fin, fecha_inicio, fecha_fin } = horario;
                if (!hora_inicio || !hora_fin || !fecha_inicio || !fecha_fin) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                console.log('Received data:', horario);
                const result = yield database_1.default.query('INSERT INTO horario (hora_inicio, hora_fin, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)', [hora_inicio, hora_fin, fecha_inicio, fecha_fin]);
                res.status(201).json({ message: 'Horario insertado' });
            }
            catch (error) {
                console.error('Database query error:', error);
                if (!res.headersSent) {
                    res.status(500).json({ message: 'Error al insertar en la base de datos' });
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_horario } = req.params;
                yield database_1.default.query('DELETE FROM horario WHERE id_horario = ?', [id_horario]);
                res.json({ message: 'Horario eliminado' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al eliminar el horario');
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_horario } = req.params;
                const { hora_inicio, hora_fin, fecha_inicio, fecha_fin } = req.body;
                if (!hora_inicio || !hora_fin || !fecha_inicio || !fecha_fin) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                const result = yield database_1.default.query('UPDATE horario SET hora_inicio = ?, hora_fin = ?, fecha_inicio = ?, fecha_fin = ? WHERE id_horario = ?', [hora_inicio, hora_fin, fecha_inicio, fecha_fin, id_horario]);
                res.json({ message: 'Horario actualizado' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al actualizar el horario');
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_horario } = req.params;
                const result = yield database_1.default.query('SELECT * FROM horario WHERE id_horario = ?', [id_horario]);
                res.json(result);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al consultar el horario');
            }
        });
    }
}
exports.horarioController = new HorarioController();
