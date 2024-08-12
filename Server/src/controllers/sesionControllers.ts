import { Request, Response } from 'express';
import pool from '../database';

class SesionController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const sesiones = await pool.query('SELECT * FROM sesion');
      res.json(sesiones);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).send('Error al consultar las sesiones');
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const sesion = req.body;
      const { usuario, id_rol, contraseña } = sesion;
      if (!usuario || !id_rol || !contraseña) {
        res.status(400).json({ message: 'Datos incompletos' });
        return;
      }

      await pool.query('INSERT INTO sesion (usuario, id_rol, contraseña) VALUES (?, ?, ?)', [usuario, id_rol, contraseña]);
      res.status(201).json({ message: 'Sesión creada con éxito' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).send('Error al crear la sesión');
    }
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    try {
      const { usuario } = req.params;
      const result = await pool.query('SELECT * FROM sesion WHERE usuario = ?', [usuario]);
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).send('Sesión no encontrada');
      }
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).send('Error al obtener la sesión');
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { usuario } = req.params;
      const { id_rol, contraseña } = req.body;

      if (!id_rol || !contraseña) {
        res.status(400).json({ message: 'Datos incompletos' });
        return;
      }

      await pool.query('UPDATE sesion SET id_rol = ?, contraseña = ? WHERE usuario = ?', [id_rol, contraseña, usuario]);
      res.json({ message: 'Sesión actualizada con éxito' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).send('Error al actualizar la sesión');
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { usuario } = req.params;
      await pool.query('DELETE FROM sesion WHERE usuario = ?', [usuario]);
      res.json({ message: 'Sesión eliminada con éxito' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).send('Error al eliminar la sesión');
    }
  }
}

export const sesionControllers = new SesionController();
