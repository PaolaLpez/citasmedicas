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
exports.loginController = void 0;
const database_1 = __importDefault(require("../database"));
class LoginController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo_electronico, contrasena } = req.body;
            try {
                // Verificar paciente
                let result = yield database_1.default.query('SELECT * FROM paciente WHERE LOWER(correo_electronico) = LOWER(?) AND contrasena = ?', [correo_electronico, contrasena]);
                if (result.length > 0) {
                    res.json({ role: 'paciente', id: result[0].id_paciente });
                    return;
                }
                // Verificar doctor
                result = yield database_1.default.query('SELECT * FROM doctor WHERE LOWER(correo_electronico) = LOWER(?) AND contrasena = ?', [correo_electronico, contrasena]);
                if (result.length > 0) {
                    res.json({ role: 'doctor', id: result[0].id_doctor });
                    return;
                }
                // Verificar administrador
                result = yield database_1.default.query('SELECT * FROM administrador WHERE LOWER(correo_electronico) = LOWER(?) AND contrasena = ?', [correo_electronico, contrasena]);
                if (result.length > 0) {
                    res.json({ role: 'administrador', id: result[0].id_administrador });
                    return;
                }
                // Si no se encuentra ningún registro
                res.status(401).json({ message: 'Credenciales incorrectas' });
            }
            catch (error) {
                console.error('Error al iniciar sesión:', error);
                res.status(500).json({ message: 'Error interno del servidor' });
            }
        });
    }
}
exports.loginController = new LoginController();
