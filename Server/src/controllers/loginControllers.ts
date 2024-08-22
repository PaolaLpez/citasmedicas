import { Request, Response } from 'express';
import pool from '../database';

class LoginController {
  public async login(req: Request, res: Response): Promise<void> {
    const { correo_electronico, contrasena } = req.body;

    try {
      // Verificar usuario en la tabla usuario
      const result = await pool.query('SELECT * FROM usuario WHERE LOWER(correo_electronico) = LOWER(?) AND contrasena = ?', [correo_electronico, contrasena]);
      
      if (result.length > 0) {
        const user = result[0];
        const roleId = user.id_rol;

        // Determinar el rol basado en id_rol
        let role = '';
        if (roleId === 1) {
          role = 'administrador';
        } else if (roleId === 2) {
          role = 'doctor';
        } else if (roleId === 3) {
          role = 'paciente';
        }

        res.json({ role, id: user.id_usuario });
      } else {
        // Si no se encuentra ningún registro
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

export const loginController = new LoginController();
