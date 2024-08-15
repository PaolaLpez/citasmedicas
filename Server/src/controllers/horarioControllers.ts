import { Request, Response } from "express";
import pool from "../database";

class HorarioController {
    public async list(req: Request, res: Response): Promise<void> {
        try {
            const horarios = await pool.query('SELECT * FROM horario');
            res.json(horarios);
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).send('Error al consultar la base de datos');
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const horario = Array.isArray(req.body) ? req.body[0] : req.body;

            const { hora_inicio, hora_fin, fecha_inicio, fecha_fin } = horario;
            if (!hora_inicio || !hora_fin || !fecha_inicio || !fecha_fin) {
                res.status(400).json({ message: 'Datos incompletos' });
                return;
            }

            console.log('Received data:', horario);

            const result = await pool.query(
                'INSERT INTO horario (hora_inicio, hora_fin, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)',
                [hora_inicio, hora_fin, fecha_inicio, fecha_fin]
            );

            res.status(201).json({ message: 'Horario insertado' });
        } catch (error) {
            console.error('Database query error:', error);
            if (!res.headersSent) {
                res.status(500).json({ message: 'Error al insertar en la base de datos' });
            }
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id_horario } = req.params;
            await pool.query('DELETE FROM horario WHERE id_horario = ?', [id_horario]);
            res.json({ message: 'Horario eliminado' });
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).send('Error al eliminar el horario');
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id_horario } = req.params;
            const { hora_inicio, hora_fin, fecha_inicio, fecha_fin } = req.body;

            if (!hora_inicio || !hora_fin || !fecha_inicio || !fecha_fin) {
                res.status(400).json({ message: 'Datos incompletos' });
                return;
            }

            const result = await pool.query(
                'UPDATE horario SET hora_inicio = ?, hora_fin = ?, fecha_inicio = ?, fecha_fin = ? WHERE id_horario = ?',
                [hora_inicio, hora_fin, fecha_inicio, fecha_fin, id_horario]
            );

            res.json({ message: 'Horario actualizado' });
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).send('Error al actualizar el horario');
        }
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        try {
            const { id_horario } = req.params;
            const result = await pool.query('SELECT * FROM horario WHERE id_horario = ?', [id_horario]);
            res.json(result);
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).send('Error al consultar el horario');
        }
    }
}

export const horarioController = new HorarioController();
