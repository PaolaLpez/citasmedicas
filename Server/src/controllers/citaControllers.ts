import { Request, Response } from 'express';
import pool from '../database'; // Asegúrate de que el pool de conexiones esté correctamente configurado

class CitaController {
    // Manejar la solicitud POST para agregar una nueva cita
    public async addCita(req: Request, res: Response): Promise<void> {
        const { id_paciente, id_doctor, fecha, hora, estado } = req.body;

        try {
            const sql = 'INSERT INTO cita (id_paciente, id_doctor, fecha, hora, estado) VALUES (?, ?, ?, ?, ?)';
            const values = [id_paciente, id_doctor, fecha, hora, estado];
            const result = await pool.query(sql, values);
            res.status(201).send(`Cita agregada exitosamente con ID: ${result.insertId}`);
        } catch (error) {
            console.error('Error al insertar la cita:', error);
            res.status(500).send('Error al agregar la cita');
        }
    }

    // Manejar la solicitud GET para obtener citas por fecha
    public async getCitasByFecha(req: Request, res: Response): Promise<void> {
        const { fecha } = req.query;

        try {
            const sql = 'SELECT * FROM cita WHERE fecha = ?';
            const result = await pool.query(sql, [fecha]);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener citas:', error);
            res.status(500).send('Error al obtener citas');
        }
    }

    // Manejar la solicitud PUT para actualizar el estado de una cita
    public async updateCita(req: Request, res: Response): Promise<void> {
        const { id_cita } = req.params;
        const { estado } = req.body;

        try {
            const sql = 'UPDATE cita SET estado = ? WHERE id_cita = ?';
            await pool.query(sql, [estado, id_cita]);
            res.status(200).send('Cita actualizada exitosamente');
        } catch (error) {
            console.error('Error al actualizar la cita:', error);
            res.status(500).send('Error al actualizar la cita');
        }
    }

    // Manejar la solicitud DELETE para eliminar una cita
    public async deleteCita(req: Request, res: Response): Promise<void> {
        const { id_cita } = req.params;

        try {
            const sql = 'DELETE FROM cita WHERE id_cita = ?';
            await pool.query(sql, [id_cita]);
            res.status(200).send('Cita eliminada exitosamente');
        } catch (error) {
            console.error('Error al eliminar la cita:', error);
            res.status(500).send('Error al eliminar la cita');
        }
    }
}

export default CitaController;

