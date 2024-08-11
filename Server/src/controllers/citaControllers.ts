import { Request, Response } from 'express';
import pool from '../database'; // Asegúrate de que el pool de conexiones esté correctamente configurado

class CitaController {
    // Manejar la solicitud POST para agregar una nueva cita
    public async addCita(req: Request, res: Response): Promise<void> {
        const { id_paciente, id_doctor, fecha, hora, estado } = req.body;

        // Validar los datos de entrada
        if (!id_paciente || !id_doctor || !fecha || !hora || !estado) {
            res.status(400).send('Todos los campos son necesarios');
            return;
        }

        try {
            const sql = 'INSERT INTO cita (id_paciente, id_doctor, fecha, hora, estado) VALUES (?, ?, ?, ?, ?)';
            const values = [id_paciente, id_doctor, fecha, hora, estado];
            const [result] = await pool.query(sql, values);

            // Verifica si la consulta se realizó correctamente
            if ('insertId' in result) {
                res.status(201).send(`Cita agregada exitosamente con ID: ${result.insertId}`);
            } else {
                res.status(500).send('Error al obtener el ID de la nueva cita');
            }
        } catch (error) {
            console.error('Error al insertar la cita:', error);
            res.status(500).send('Error al agregar la cita');
        }
    }

    // Manejar la solicitud GET para obtener citas por fecha
    public async getCitasByFecha(req: Request, res: Response): Promise<void> {
        const { fecha } = req.query;

        if (!fecha) {
            res.status(400).send('La fecha es requerida');
            return;
        }

        try {
            const sql = 'SELECT * FROM cita WHERE fecha = ?';
            const [results] = await pool.query(sql, [fecha]);
            res.status(200).json(results);
        } catch (error) {
            console.error('Error al obtener citas:', error);
            res.status(500).send('Error al obtener citas');
        }
    }

    // Manejar la solicitud PUT para actualizar el estado de una cita
    public async updateCita(req: Request, res: Response): Promise<void> {
        const { id_cita } = req.params;
        const { estado } = req.body;

        if (!estado) {
            res.status(400).send('El estado es requerido');
            return;
        }

        try {
            const sql = 'UPDATE cita SET estado = ? WHERE id_cita = ?';
            const [result] = await pool.query(sql, [estado, id_cita]);

            if ((result as any).affectedRows === 0) {
                res.status(404).send('Cita no encontrada');
                return;
            }

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
            const [result] = await pool.query(sql, [id_cita]);

            if ((result as any).affectedRows === 0) {
                res.status(404).send('Cita no encontrada');
                return;
            }

            res.status(200).send('Cita eliminada exitosamente');
        } catch (error) {
            console.error('Error al eliminar la cita:', error);
            res.status(500).send('Error al eliminar la cita');
        }
    }
}

export default CitaController;

