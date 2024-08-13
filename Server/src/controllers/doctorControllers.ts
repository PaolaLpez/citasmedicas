import { Request, Response } from 'express';
import pool from '../database'; // Asegúrate de que el pool de conexiones esté correctamente configurado

class DoctorController {
    // Manejar la solicitud POST para agregar un nuevo doctor
    public async addDoctor(req: Request, res: Response): Promise<void> {
        const { usuario, id_horario, ncmre_doc, tipo_doctor } = req.body;

        // Validar los datos de entrada
        if (!usuario || !id_horario || !ncmre_doc || !tipo_doctor) {
            res.status(400).send('Todos los campos son necesarios');
            return;
        }

        try {
            const sql = 'INSERT INTO doctor (usuario, id_horario, ncmre_doc, tipo_doctor) VALUES (?, ?, ?, ?)';
            const values = [usuario, id_horario, ncmre_doc, tipo_doctor];
            const [result] = await pool.query(sql, values);

            // Verifica si la consulta se realizó correctamente
            if ('insertId' in result) {
                res.status(201).send(`Doctor agregado exitosamente con ID: ${result.insertId}`);
            } else {
                res.status(500).send('Error al obtener el ID del nuevo doctor');
            }
        } catch (error) {
            console.error('Error al insertar el doctor:', error);
            res.status(500).send('Error al agregar el doctor');
        }
    }

    // Manejar la solicitud GET para obtener todos los doctores
    public async getDoctors(req: Request, res: Response): Promise<void> {
        try {
            const sql = 'SELECT * FROM doctor';
            const [results] = await pool.query(sql);
            res.status(200).json(results);
        } catch (error) {
            console.error('Error al obtener los doctores:', error);
            res.status(500).send('Error al obtener los doctores');
        }
    }

    // Manejar la solicitud PUT para actualizar un doctor
    public async updateDoctor(req: Request, res: Response): Promise<void> {
        const { id_doctor } = req.params;
        const { usuario, id_horario, ncmre_doc, tipo_doctor } = req.body;

        if (!usuario || !id_horario || !ncmre_doc || !tipo_doctor) {
            res.status(400).send('Todos los campos son necesarios');
            return;
        }

        try {
            const sql = 'UPDATE doctor SET usuario = ?, id_horario = ?, ncmre_doc = ?, tipo_doctor = ? WHERE id_doctor = ?';
            const values = [usuario, id_horario, ncmre_doc, tipo_doctor, id_doctor];
            const [result] = await pool.query(sql, values);

            if ((result as any).affectedRows === 0) {
                res.status(404).send('Doctor no encontrado');
                return;
            }

            res.status(200).send('Doctor actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar el doctor:', error);
            res.status(500).send('Error al actualizar el doctor');
        }
    }

    // Manejar la solicitud DELETE para eliminar un doctor
    public async deleteDoctor(req: Request, res: Response): Promise<void> {
        const { id_doctor } = req.params;

        try {
            const sql = 'DELETE FROM doctor WHERE id_doctor = ?';
            const [result] = await pool.query(sql, [id_doctor]);

            if ((result as any).affectedRows === 0) {
                res.status(404).send('Doctor no encontrado');
                return;
            }

            res.status(200).send('Doctor eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar el doctor:', error);
            res.status(500).send('Error al eliminar el doctor');
        }
    }
}

export default DoctorController;
