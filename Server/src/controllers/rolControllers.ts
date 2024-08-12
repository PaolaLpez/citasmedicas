import { Request, Response } from 'express';
import pool from '../database'; 

class RolController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const roles = await pool.query('SELECT * FROM rol');
      res.json(roles);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).send('Error al consultar la base de datos');
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const rol = req.body;
      const { id_rol, tipo_rol } = rol;
      if (!id_rol || !tipo_rol) {
        res.status(400).json({ message: 'Datos incompletos' });
        return;
      }

      await pool.query('INSERT INTO rol (id_rol, tipo_rol) VALUES (?, ?)', [id_rol, tipo_rol]);
      res.status(201).json({ message: 'Rol creado con éxito' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).send('Error al crear el rol');
    }
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    try {
      const { id_rol } = req.params;
      const result = await pool.query('SELECT * FROM rol WHERE id_rol = ?', [id_rol]);
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).send('Rol no encontrado');
      }
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).send('Error al obtener el rol');
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id_rol } = req.params;
      const { tipo_rol } = req.body;

      if (!tipo_rol) {
        res.status(400).json({ message: 'Datos incompletos' });
        return;
      }

      await pool.query('UPDATE rol SET tipo_rol = ? WHERE id_rol = ?', [tipo_rol, id_rol]);
      res.json({ message: 'Rol actualizado con éxito' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).send('Error al actualizar el rol');
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id_rol } = req.params;
      await pool.query('DELETE FROM rol WHERE id_rol = ?', [id_rol]);
      res.json({ message: 'Rol eliminado con éxito' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).send('Error al eliminar el rol');
    }
  }
}

export const rolControllers = new RolController();
