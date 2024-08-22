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
exports.citaController = void 0;
const database_1 = __importDefault(require("../database"));
class CitaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const citas = yield database_1.default.query('SELECT * FROM cita');
                res.json(citas);
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
                const cita = Array.isArray(req.body) ? req.body[0] : req.body;
                const { id_paciente, id_doctor, nombre_especialidad, nombre_doc, nombre_paciente, fecha, hora } = cita;
                if (!id_paciente || !id_doctor || !nombre_especialidad || !nombre_doc || !nombre_paciente || !fecha || !hora) {
                    console.log('Datos incompletos:', cita); // Imprime los datos que se están recibiendo
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                const result = yield database_1.default.query('INSERT INTO cita (id_paciente, id_doctor, nombre_especialidad, nombre_doc, nom_paciente, fecha, hora) VALUES (?, ?, ?, ?, ?, ?, ?)', [id_paciente, id_doctor, nombre_especialidad, nombre_doc, nombre_paciente, fecha, hora]);
                res.status(201).json({ message: 'Cita insertada' });
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
                const { id_cita } = req.params;
                yield database_1.default.query('DELETE FROM cita WHERE id_cita = ?', [id_cita]);
                res.json({ message: 'Cita eliminada' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al eliminar la cita');
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_cita } = req.params;
                const { id_paciente, id_doctor, fecha, hora, estado } = req.body;
                if (!id_paciente || !id_doctor || !fecha || !hora || !estado) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                const result = yield database_1.default.query('UPDATE cita SET id_paciente = ?, id_doctor = ?, fecha = ?, hora = ?, estado = ? WHERE id_cita = ?', [id_paciente, id_doctor, fecha, hora, estado, id_cita]);
                res.json({ message: 'Cita actualizada' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al actualizar la cita');
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_cita } = req.params;
                const result = yield database_1.default.query('SELECT * FROM cita WHERE id_cita = ?', [id_cita]);
                res.json(result);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al consultar la cita');
            }
        });
    }
}
exports.citaController = new CitaController();
