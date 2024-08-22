import { Request, Response } from "express";
import pool from "../database";

class CitaController {
    public async list(req: Request, res: Response): Promise<void> {
        try {
            const citas = await pool.query('SELECT * FROM cita');
            res.json(citas);
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).send('Error al consultar la base de datos');
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const cita = Array.isArray(req.body) ? req.body[0] : req.body;
    
            const { id_paciente, id_doctor, nombre_especialidad, nombre_doc, nombre_paciente, fecha, hora } = cita;
            if (!id_paciente || !id_doctor || !nombre_especialidad || !nombre_doc || !nombre_paciente || !fecha || !hora) {
                console.log('Datos incompletos:', cita); // Imprime los datos que se están recibiendo
                res.status(400).json({ message: 'Datos incompletos' });
                return;
            }
    
            const result = await pool.query(
                'INSERT INTO cita (id_paciente, id_doctor, nombre_especialidad, nombre_doc, nom_paciente, fecha, hora) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [id_paciente, id_doctor, nombre_especialidad, nombre_doc, nombre_paciente, fecha, hora]
            );
    
            res.status(201).json({ message: 'Cita insertada' });
        } catch (error) {
            console.error('Database query error:', error);
            if (!res.headersSent) {
                res.status(500).json({ message: 'Error al insertar en la base de datos' });
            }
        }
    }
    
    

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id_cita } = req.params;
            await pool.query('DELETE FROM cita WHERE id_cita = ?', [id_cita]);
            res.json({ message: 'Cita eliminada' });
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).send('Error al eliminar la cita');
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id_cita } = req.params;
            const { id_paciente, id_doctor, fecha, hora, estado } = req.body;

            if (!id_paciente || !id_doctor || !fecha || !hora || !estado) {
                res.status(400).json({ message: 'Datos incompletos' });
                return;
            }

            const result = await pool.query(
                'UPDATE cita SET id_paciente = ?, id_doctor = ?, fecha = ?, hora = ?, estado = ? WHERE id_cita = ?',
                [id_paciente, id_doctor, fecha, hora, estado, id_cita]
            );

            res.json({ message: 'Cita actualizada' });
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).send('Error al actualizar la cita');
        }
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        try {
            const { id_cita } = req.params;
            const result = await pool.query('SELECT * FROM cita WHERE id_cita = ?', [id_cita]);
            res.json(result);
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).send('Error al consultar la cita');
        }
    }
}

export const citaController = new CitaController();
