import { Request, Response } from 'express';
import pool from '../database';

class LoginController {
  public async login(req: Request, res: Response): Promise<void> {
    const { correo_electronico, contrasena } = req.body;

    try {
      // Verificar paciente
      let result = await pool.query('SELECT * FROM paciente WHERE LOWER(correo_electronico) = LOWER(?) AND contrasena = ?', [correo_electronico, contrasena]);
      if (result.length > 0) {
        res.json({ role: 'paciente', id: result[0].id_paciente });
        return;
      }

      // Verificar doctor
      result = await pool.query('SELECT * FROM doctor WHERE LOWER(correo_electronico) = LOWER(?) AND contrasena = ?', [correo_electronico, contrasena]);
      if (result.length > 0) {
        res.json({ role: 'doctor', id: result[0].id_doctor });
        return;
      }

      // Verificar administrador
      result = await pool.query('SELECT * FROM administrador WHERE LOWER(correo_electronico) = LOWER(?) AND contrasena = ?', [correo_electronico, contrasena]);
      if (result.length > 0) {
        res.json({ role: 'administrador', id: result[0].id_administrador });
        return;
      }

      // Si no se encuentra ningún registro
      res.status(401).json({ message: 'Credenciales incorrectas' });

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

export const loginController = new LoginController();
