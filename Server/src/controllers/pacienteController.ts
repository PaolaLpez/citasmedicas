import { Request, Response } from 'express';
import pool from '../database';

class PacienteController {
    // Agregar un nuevo paciente
    public async addPaciente(req: Request, res: Response): Promise<void> {
        const { usuario, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, padecimiento, curp, num_telefono, correo_electronico } = req.body;

        try {
            const sql = 'INSERT INTO paciente (usuario, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, padecimiento, curp, num_telefono, correo_electronico) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [usuario, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, padecimiento, curp, num_telefono, correo_electronico];
            const result = await pool.query(sql, values);
            res.status(201).send(`Paciente agregado exitosamente con ID: ${result.insertId}`);
        } catch (error) {
            console.error('Error al insertar el paciente:', error);
            res.status(500).send('Error al agregar el paciente');
        }
    }

    // Obtener todos los pacientes
    public async getPacientes(req: Request, res: Response): Promise<void> {
        try {
            const sql = 'SELECT * FROM paciente';
            const result = await pool.query(sql);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener pacientes:', error);
            res.status(500).send('Error al obtener pacientes');
        }
    }

    // Obtener un paciente por ID
    public async getPacienteById(req: Request, res: Response): Promise<void> {
        const { id_paciente } = req.params;

        try {
            const sql = 'SELECT * FROM paciente WHERE id_paciente = ?';
            const result = await pool.query(sql, [id_paciente]);

            if (result.length > 0) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).send('Paciente no encontrado');
            }
        } catch (error) {
            console.error('Error al obtener el paciente:', error);
            res.status(500).send('Error al obtener el paciente');
        }
    }

    // Actualizar un paciente
    public async updatePaciente(req: Request, res: Response): Promise<void> {
        const { id_paciente } = req.params;
        const { usuario, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, padecimiento, curp, num_telefono, correo_electronico } = req.body;

        try {
            const sql = 'UPDATE paciente SET usuario = ?, nom_paciente = ?, fecha_nac = ?, genero = ?, direccion = ?, tipo_sangre = ?, padecimiento = ?, curp = ?, num_telefono = ?, correo_electronico = ? WHERE id_paciente = ?';
            const result = await pool.query(sql, [usuario, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, padecimiento, curp, num_telefono, correo_electronico, id_paciente]);

            if (result.affectedRows > 0) {
                res.status(200).send('Paciente actualizado exitosamente');
            } else {
                res.status(404).send('Paciente no encontrado');
            }
        } catch (error) {
            console.error('Error al actualizar el paciente:', error);
            res.status(500).send('Error al actualizar el paciente');
        }
    }

    // Eliminar un paciente
    public async deletePaciente(req: Request, res: Response): Promise<void> {
        const { id_paciente } = req.params;

        try {
            const sql = 'DELETE FROM paciente WHERE id_paciente = ?';
            const result = await pool.query(sql, [id_paciente]);

            if (result.affectedRows > 0) {
                res.status(200).send('Paciente eliminado exitosamente');
            } else {
                res.status(404).send('Paciente no encontrado');
            }
        } catch (error) {
            console.error('Error al eliminar el paciente:', error);
            res.status(500).send('Error al eliminar el paciente');
        }
    }
}

export default PacienteController;
