import { Request, Response } from 'express';
import pool from '../database';

class InicioAdminController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { usuario, id_doctor, nombre_adm } = req.body;
      if (!usuario || !id_doctor || !nombre_adm) {
        res.status(400).json({ message: 'Datos incompletos' });
        return;
      }
      await pool.query(
        'INSERT INTO administrador (usuario, id_doctor, nombre_adm) VALUES (?, ?, ?)',
        [usuario, id_doctor, nombre_adm]
      );
      res.status(201).json({ message: 'Administrador creado con éxito' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ message: 'Error al crear administrador' });
    }
  }

  public async list(req: Request, res: Response): Promise<void> {
    try {
      const admins = await pool.query('SELECT * FROM administrador');
      res.json(admins);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ message: 'Error al consultar administradores' });
    }
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    try {
      const { id_administrador } = req.params;
      const result = await pool.query('SELECT * FROM administrador WHERE id_administrador = ?', [id_administrador]);
      if (result.length === 0) {
        res.status(404).json({ message: 'Administrador no encontrado' });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ message: 'Error al obtener administrador' });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id_administrador } = req.params;
      const { usuario, id_doctor, nombre_adm } = req.body;
      if (!usuario || !id_doctor || !nombre_adm) {
        res.status(400).json({ message: 'Datos incompletos' });
        return;
      }
      await pool.query(
        'UPDATE administrador SET usuario = ?, id_doctor = ?, nombre_adm = ? WHERE id_administrador = ?',
        [usuario, id_doctor, nombre_adm, id_administrador]
      );
      res.json({ message: 'Administrador actualizado con éxito' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ message: 'Error al actualizar administrador' });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id_administrador } = req.params;
      await pool.query('DELETE FROM administrador WHERE id_administrador = ?', [id_administrador]);
      res.json({ message: 'Administrador eliminado con éxito' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ message: 'Error al eliminar administrador' });
    }
  }
}

export const inicioAdminControllers = new InicioAdminController();
