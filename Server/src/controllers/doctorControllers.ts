import { Request, Response } from "express";
import pool from "../database";

class DoctorController {
    public async list(req: Request, res: Response): Promise<void> {
        try {
            const doctors = await pool.query('SELECT * FROM doctor');
            res.json(doctors);
        } catch (error) {
            console.error('Database query error:', error); // Imprimir el error completo
            res.status(500).send('Error al consultar la base de datos');
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const doctor = Array.isArray(req.body) ? req.body[0] : req.body;

            const { usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor } = doctor;
            if (!usuario || !id_especialidad || !id_horario || !nombre_doc || !tipo_doctor) {
                res.status(400).json({ message: 'Datos incompletos' });
                return;
            }

            console.log('Received data:', doctor);

            const result = await pool.query(
                'INSERT INTO doctor (usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor) VALUES (?, ?, ?, ?, ?)',
                [usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor]
            );

            res.status(201).json({ message: 'Doctor insertado' });
        } catch (error) {
            console.error('Database query error:', error); // Imprimir el error completo
            if (!res.headersSent) {
                res.status(500).json({ message: 'Error al insertar en la base de datos' });
            }
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id_doctor } = req.params;
            await pool.query('DELETE FROM doctor WHERE id_doctor = ?', [id_doctor]);
            res.json({ message: 'Doctor eliminado' });
        } catch (error) {
            console.error('Database query error:', error); // Imprimir el error completo
            res.status(500).send('Error al eliminar el doctor');
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id_doctor } = req.params;
            const { usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor } = req.body;

            if (!usuario || !id_especialidad || !id_horario || !nombre_doc || !tipo_doctor) {
                res.status(400).json({ message: 'Datos incompletos' });
                return;
            }

            const result = await pool.query(
                'UPDATE doctor SET usuario = ?, id_especialidad = ?, id_horario = ?, nombre_doc = ?, tipo_doctor = ? WHERE id_doctor = ?',
                [usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor, id_doctor]
            );

            res.json({ message: 'Doctor actualizado' });
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).send('Error al actualizar el doctor');
        }
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        try {
            const { id_doctor } = req.params;
            const result = await pool.query('SELECT * FROM doctor WHERE id_doctor = ?', [id_doctor]);
            res.json(result);
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).send('Error al consultar el doctor');
        }
    }
}

export const doctorController = new DoctorController();
