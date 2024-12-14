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
                // Verificar usuario en la tabla usuario
                const result = yield database_1.default.query('SELECT * FROM usuario WHERE LOWER(correo_electronico) = LOWER(?) AND contrasena = ?', [correo_electronico, contrasena]);
                if (result.length > 0) {
                    const user = result[0];
                    const roleId = user.id_rol;
                    // Determinar el rol basado en id_rol
                    let role = '';
                    if (roleId === 1) {
                        role = 'administrador';
                    }
                    else if (roleId === 2) {
                        role = 'doctor';
                    }
                    else if (roleId === 3) {
                        role = 'paciente';
                    }
                    res.json({ role, id: user.id_usuario });
                }
                else {
                    // Si no se encuentra ningún registro
                    res.status(401).json({ message: 'Credenciales incorrectas' });
                }
            }
            catch (error) {
                console.error('Error al iniciar sesión:', error);
                res.status(500).json({ message: 'Error interno del servidor' });
            }
        });
    }
}
exports.loginController = new LoginController();
