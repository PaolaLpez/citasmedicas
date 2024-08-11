import { Request, Response } from 'express';
import pool from '../database'; // Ensure your pool configuration is correct

class HorarioController {
    // Handle POST request to add a new horario
    public async addHorario(req: Request, res: Response): Promise<void> {
        const { hora_inicio, hora_fin, fecha_inicio, fecha_fin } = req.body;

        // Validate input data
        if (!hora_inicio || !hora_fin || !fecha_inicio || !fecha_fin) {
            res.status(400).send('Todos los campos son necesarios');
            return;
        }

        try {
            const sql = 'INSERT INTO horario (hora_inicio, hora_fin, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)';
            const values = [hora_inicio, hora_fin, fecha_inicio, fecha_fin];
            const [result] = await pool.query(sql, values);

            // Check if the insert was successful
            if ('insertId' in result) {
                res.status(201).send(`Horario agregado exitosamente con ID: ${result.insertId}`);
            } else {
                res.status(500).send('Error al obtener el ID del nuevo horario');
            }
        } catch (error) {
            console.error('Error al insertar el horario:', error);
            res.status(500).send('Error al agregar el horario');
        }
    }

    // Handle GET request to fetch all horarios
    public async getHorarios(req: Request, res: Response): Promise<void> {
        try {
            const sql = 'SELECT * FROM horario';
            const [results] = await pool.query(sql);
            res.status(200).json(results);
        } catch (error) {
            console.error('Error al obtener horarios:', error);
            res.status(500).send('Error al obtener horarios');
        }
    }

    // Handle PUT request to update a horario
    public async updateHorario(req: Request, res: Response): Promise<void> {
        const { id_horario } = req.params;
        const { hora_inicio, hora_fin, fecha_inicio, fecha_fin } = req.body;

        // Validate input data
        if (!hora_inicio || !hora_fin || !fecha_inicio || !fecha_fin) {
            res.status(400).send('Todos los campos son necesarios');
            return;
        }

        try {
            const sql = 'UPDATE horario SET hora_inicio = ?, hora_fin = ?, fecha_inicio = ?, fecha_fin = ? WHERE id_horario = ?';
            const [result] = await pool.query(sql, [hora_inicio, hora_fin, fecha_inicio, fecha_fin, id_horario]);

            if ((result as any).affectedRows === 0) {
                res.status(404).send('Horario no encontrado');
                return;
            }

            res.status(200).send('Horario actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar el horario:', error);
            res.status(500).send('Error al actualizar el horario');
        }
    }

    // Handle DELETE request to remove a horario
    public async deleteHorario(req: Request, res: Response): Promise<void> {
        const { id_horario } = req.params;

        try {
            const sql = 'DELETE FROM horario WHERE id_horario = ?';
            const [result] = await pool.query(sql, [id_horario]);

            if ((result as any).affectedRows === 0) {
                res.status(404).send('Horario no encontrado');
                return;
            }

            res.status(200).send('Horario eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar el horario:', error);
            res.status(500).send('Error al eliminar el horario');
        }
    }
}

export default HorarioController;
