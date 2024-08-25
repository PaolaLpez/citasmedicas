import { Request, Response } from "express";
import pool from "../database";

class CitaController {

    // Método para listar todas las citas
    public async list(req: Request, res: Response): Promise<void> {
        try {
            const [citas] = await pool.query('SELECT * FROM cita');
            res.json(citas);
        } catch (error) {
            console.error('Error al consultar la base de datos:', error);
            res.status(500).json({ message: 'Error al consultar la base de datos', error: (error as Error).message });
        }
    }

    // Método para crear una nueva cita
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const cita = Array.isArray(req.body) ? req.body[0] : req.body;

            const { id_paciente, id_doctor, nombre_especialidad, nombre_doc, nom_paciente, fecha, hora } = cita;

            // Validar que todos los campos necesarios estén presentes
            if (!id_paciente || !id_doctor || !nombre_especialidad || !nombre_doc || !nom_paciente || !fecha || !hora) {
                console.log('Datos incompletos:', cita);
                res.status(400).json({ message: 'Datos incompletos' });
                return;
            }

            // Insertar la nueva cita en la base de datos
            const [result] = await pool.query(
                'INSERT INTO cita (id_paciente, id_doctor, nombre_especialidad, nombre_doc, nom_paciente, fecha, hora) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [id_paciente, id_doctor, nombre_especialidad, nombre_doc, nom_paciente, fecha, hora]
            );

            res.status(201).json({ message: 'Cita insertada correctamente', insertId: (result as any).insertId });
        } catch (error) {
            console.error('Error al insertar en la base de datos:', error);
            res.status(500).json({ message: 'Error al insertar en la base de datos', error: (error as Error).message });
        }
    }

    // Método para eliminar una cita por ID
    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id_cita } = req.params;
            await pool.query('DELETE FROM cita WHERE id_cita = ?', [id_cita]);
            res.json({ message: 'Cita eliminada' });
        } catch (error) {
            console.error('Error al eliminar la cita:', error);
            res.status(500).json({ message: 'Error al eliminar la cita', error: (error as Error).message });
        }
    }

    // Método para actualizar una cita
    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id_cita } = req.params;
            const { id_paciente, id_doctor, nombre_especialidad, nombre_doc, nom_paciente, fecha, hora, estado } = req.body;

            // Validar que todos los campos necesarios estén presentes
            if (!id_paciente || !id_doctor || !nombre_especialidad || !nombre_doc || !nom_paciente || !fecha || !hora || !estado) {
                res.status(400).json({ message: 'Datos incompletos' });
                return;
            }

            // Actualizar la cita en la base de datos
            await pool.query(
                'UPDATE cita SET id_paciente = ?, id_doctor = ?, nombre_especialidad = ?, nombre_doc = ?, nom_paciente = ?, fecha = ?, hora = ?, estado = ? WHERE id_cita = ?',
                [id_paciente, id_doctor, nombre_especialidad, nombre_doc, nom_paciente, fecha, hora, estado, id_cita]
            );

            res.json({ message: 'Cita actualizada' });
        } catch (error) {
            console.error('Error al actualizar la cita:', error);
            res.status(500).json({ message: 'Error al actualizar la cita', error: (error as Error).message });
        }
    }

    // Método para obtener una cita por ID
    public async getOne(req: Request, res: Response): Promise<void> {
        try {
            const { id_cita } = req.params;
            const [result] = await pool.query('SELECT * FROM cita WHERE id_cita = ?', [id_cita]);
            res.json(result);
        } catch (error) {
            console.error('Error al consultar la cita:', error);
            res.status(500).json({ message: 'Error al consultar la cita', error: (error as Error).message });
        }
    }

    // Método para obtener las horas ocupadas en una fecha específica
    public async getHorasOcupadas(req: Request, res: Response): Promise<void> {
        try {
            const { fecha } = req.query;
            if (!fecha) {
                res.status(400).json({ message: 'Fecha requerida' });
                return;
            }

            const [result] = await pool.query('SELECT hora FROM cita WHERE fecha = ?', [fecha]);
            const horasOcupadas = Array.isArray(result) ? result.map((row: any) => row.hora) : [];
            res.json({ horasOcupadas });
        } catch (error) {
            console.error('Error al consultar las horas ocupadas:', error);
            res.status(500).json({ message: 'Error al consultar las horas ocupadas', error: (error as Error).message });
        }
    }
}

// Exportar una instancia de CitaController
export const citaController = new CitaController();