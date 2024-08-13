import { Request, Response } from 'express';
import pool from '../database';

class InicioAdminController {
  // Método para crear un nuevo administrador
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { usuario, id_doctor, nombre_adm } = req.body;
      if (!usuario || !id_doctor || !nombre_adm) {
        res.status(400).json({ message: 'Datos incompletos' });
        return;
      }

      // Verificar si el usuario ya existe en la tabla sesion
      const [usuarioExists] = await pool.query('SELECT * FROM sesion WHERE usuario = ?', [usuario]);
      if (usuarioExists.length === 0) {
        res.status(400).json({ message: 'El usuario no existe en la tabla sesion' });
        return;
      }

      // Verificar si el id_doctor existe en la tabla doctor
      const [doctorExists] = await pool.query('SELECT * FROM doctor WHERE id_doctor = ?', [id_doctor]);
      if (doctorExists.length === 0) {
        res.status(400).json({ message: 'El ID de doctor no existe' });
        return;
      }

      // Insertar nuevo administrador
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

  // Método para listar todos los administradores
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const admins = await pool.query('SELECT * FROM administrador');
      res.json(admins);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ message: 'Error al consultar administradores' });
    }
  }

  // Método para obtener un administrador por ID
  public async getOne(req: Request, res: Response): Promise<void> {
    try {
      const { id_administrador } = req.params;
      const [result] = await pool.query('SELECT * FROM administrador WHERE id_administrador = ?', [id_administrador]);
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

  // Método para actualizar un administrador existente
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id_administrador } = req.params;
      const { usuario, id_doctor, nombre_adm } = req.body;
      if (!usuario || !id_doctor || !nombre_adm) {
        res.status(400).json({ message: 'Datos incompletos' });
        return;
      }

      // Verificar si el id_administrador existe
      const [adminExists] = await pool.query('SELECT * FROM administrador WHERE id_administrador = ?', [id_administrador]);
      if (adminExists.length === 0) {
        res.status(404).json({ message: 'Administrador no encontrado' });
        return;
      }

      // Verificar si el usuario existe en la tabla sesion
      const [usuarioExists] = await pool.query('SELECT * FROM sesion WHERE usuario = ?', [usuario]);
      if (usuarioExists.length === 0) {
        res.status(400).json({ message: 'El usuario no existe en la tabla sesion' });
        return;
      }

      // Verificar si el id_doctor existe en la tabla doctor
      const [doctorExists] = await pool.query('SELECT * FROM doctor WHERE id_doctor = ?', [id_doctor]);
      if (doctorExists.length === 0) {
        res.status(400).json({ message: 'El ID de doctor no existe' });
        return;
      }

      // Actualizar administrador
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

  // Método para eliminar un administrador existente
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id_administrador } = req.params;
      // Verificar si el id_administrador existe
      const [adminExists] = await pool.query('SELECT * FROM administrador WHERE id_administrador = ?', [id_administrador]);
      if (adminExists.length === 0) {
        res.status(404).json({ message: 'Administrador no encontrado' });
        return;
      }

      // Eliminar administrador
      await pool.query('DELETE FROM administrador WHERE id_administrador = ?', [id_administrador]);
      res.json({ message: 'Administrador eliminado con éxito' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ message: 'Error al eliminar administrador' });
    }
  }
}

export const inicioAdminControllers = new InicioAdminController();
