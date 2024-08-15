import { Request, Response } from 'express';
import pool from '../database'; // Asegúrate de que la ruta al archivo de conexión sea correcta

class RolController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const roles = await pool.query('SELECT * FROM rol');
      res.json(roles);
    } catch (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ message: 'Error al consultar la base de datos', error});
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { id_rol, tipo_rol } = req.body;

      // Validar datos
      if (!id_rol || !tipo_rol) {
        res.status(400).json({ message: 'Datos incompletos: id_rol y tipo_rol son requeridos' });
        return;
      }

      // Verificar si el rol ya existe
      const existingRole = await pool.query('SELECT * FROM rol WHERE id_rol = ?', [id_rol]);
      if (existingRole.length > 0) {
        res.status(409).json({ message: 'El rol ya existe' });
        return;
      }

      await pool.query('INSERT INTO rol (id_rol, tipo_rol) VALUES (?, ?)', [id_rol, tipo_rol]);
      res.status(201).json({ message: 'Rol creado con éxito' });
    } catch (error) {
      console.error('Error al crear el rol:', error);
      res.status(500).json({ message: 'Error al crear el rol', error});
    }
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    try {
      const { id_rol } = req.params;
      const result = await pool.query('SELECT * FROM rol WHERE id_rol = ?', [id_rol]);

      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ message: 'Rol no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el rol:', error);
      res.status(500).json({ message: 'Error al obtener el rol', error});
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id_rol } = req.params;
      const { tipo_rol } = req.body;

      // Validar datos
      if (!tipo_rol) {
        res.status(400).json({ message: 'Datos incompletos: tipo_rol es requerido' });
        return;
      }

      // Verificar si el rol existe
      const existingRole = await pool.query('SELECT * FROM rol WHERE id_rol = ?', [id_rol]);
      if (existingRole.length === 0) {
        res.status(404).json({ message: 'Rol no encontrado' });
        return;
      }

      await pool.query('UPDATE rol SET tipo_rol = ? WHERE id_rol = ?', [tipo_rol, id_rol]);
      res.json({ message: 'Rol actualizado con éxito' });
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
      res.status(500).json({ message: 'Error al actualizar el rol', error});
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id_rol } = req.params;

      // Verificar si el rol existe
      const existingRole = await pool.query('SELECT * FROM rol WHERE id_rol = ?', [id_rol]);
      if (existingRole.length === 0) {
        res.status(404).json({ message: 'Rol no encontrado' });
        return;
      }

      await pool.query('DELETE FROM rol WHERE id_rol = ?', [id_rol]);
      res.json({ message: 'Rol eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el rol:', error);
      res.status(500).json({ message: 'Error al eliminar el rol', error});
    }
  }
}

export const rolControllers = new RolController();
