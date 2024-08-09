import { Request, Response } from 'express';
import pool from '../database';

class CitaController {
  public async index(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query('select * from cita');
      res.json(result);
    } catch (error) {
      console.error('Database query error:', error); // Imprimir el error completo
      res.status(500).send('Error al consultar la base de datos');
    }
  }
}

export const citaController = new CitaController();
