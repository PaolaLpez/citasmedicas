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
exports.pacienteControllers = void 0;
const database_1 = __importDefault(require("../database"));
class PacienteController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paciente = yield database_1.default.query('select * from paciente');
                res.json(paciente);
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
                const paciente = Array.isArray(req.body) ? req.body[0] : req.body;
                // Validar que todos los campos requeridos están presentes
                const { nom_paciente, fecha_nac, genero, direccion, tipo_sangre, curp, num_telefono, correo_electronico, contrasena } = paciente;
                if (!nom_paciente || !fecha_nac || !genero || !direccion || !tipo_sangre || !curp || !num_telefono || !correo_electronico || !contrasena) {
                    res.status(400).json({ message: 'Datos incompletos' });
                }
                // Mostrar datos recibidos para depuración
                console.log('Received data:', paciente);
                // Ejecutar la consulta
                const result = yield database_1.default.query('INSERT INTO paciente (id_rol, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, curp, num_telefono, correo_electronico, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [3, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, curp, num_telefono, correo_electronico, contrasena]);
                res.status(201).json({ message: 'Datos de paciente insertados', id_paciente: result.insertId });
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
                const { id_paciente } = req.params;
                yield database_1.default.query('DELETE FROM paciente WHERE id_paciente =?', [id_paciente]);
                res.json({ message: 'Datos de paciente eliminados' });
            }
            catch (error) {
                console.error('Database query error:', error); // Imprimir el error completo
                res.status(500).send('Error al eliminar los datos del paciente');
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_paciente } = req.params;
                const { nom_paciente, fecha_nac, genero, direccion, tipo_sangre, curp, num_telefono, correo_electronico, contrasena } = req.body;
                const result = yield database_1.default.query('UPDATE paciente SET nom_paciente =?, fecha_nac =?, genero =?, direccion =?, tipo_sangre =?, curp =?, num_telefono =?, correo_electronico =?, contrasena=? WHERE id_paciente=?', [nom_paciente, fecha_nac, genero, direccion, tipo_sangre, curp, num_telefono, correo_electronico, contrasena, id_paciente]);
                res.json({ message: 'Datos del paciente actualizados' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al actualizar los datos del paciente');
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_paciente } = req.params; //Se recupera el id del params
                const paciente = yield database_1.default.query('SELECT * FROM paciente WHERE id_paciente=?', [id_paciente]);
                res.json(paciente);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error el paciente no existe');
            }
        });
    }
}
exports.pacienteControllers = new PacienteController();
