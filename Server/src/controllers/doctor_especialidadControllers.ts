import { Request, Response } from "express";
import pool from "../database";

class doctor_especialidadController {

public async list(req: Request, res: Response): Promise<void> {
    try {
        const doctor_especialidad = await pool.query('select *  FROM doctor_especialidad');
        res.json(doctor_especialidad);
    } catch (error) {
        console.error('Database query error:', error); // Imprimir el error completo
        res.status(500).send('Error al consultar la base de datos');
      }
    }

    
    public async create(req: Request, res: Response): Promise<void> {
        try {
            // Asumir que req.body es un array de objetos y tomar el primer objeto
            const doctor_especialidad = Array.isArray(req.body) ? req.body[0] : req.body;
    
            // Validar que todos los campos requeridos están presentes
            const {id_especialidad, id_doctor } = doctor_especialidad;
            if (!id_especialidad || !id_doctor) {
                 res.status(400).json({ message: 'Datos incompletos' });
            }
    
            // Mostrar datos recibidos para depuración
            console.log('Received data:', doctor_especialidad);
    
            // Ejecutar la consulta
            const result = await pool.query(
                'INSERT INTO doctor_especialidad (id_especialidad, id_doctor) VALUES (?, ?)',
                [id_especialidad, id_doctor]
            );
    
            res.status(201).json({ message: 'Datos de la especialidad del paciente insertados correctamente'});
        } catch (error) {
            console.error('Database query error:', error); // Imprimir el error completo
            if (!res.headersSent) {
                res.status(500).json({ message: 'Error al consultar la base de datos' });
            }
        }
    }  

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id_doctor, id_especialidad } = req.params;
            await pool.query('DELETE FROM doctor_especialidad WHERE id_doctor = ? AND id_especialidad = ?', [id_doctor, id_especialidad]);
            res.json({ message: 'Datos de la especialidad del doctor eliminados correctamente' });
        } catch (error) {
            console.error('Database query error:', error); // Imprimir el error completo
            res.status(500).send('Error al eliminar los datos del doctor');
        }
    }
    
      
    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id_doctor, id_especialidad } = req.params; // Estos son los valores actuales de la URL
            const { id_doctor: nuevo_id_doctor, id_especialidad: nuevo_id_especialidad } = req.body; // Nuevos valores en el cuerpo de la solicitud
    
            // Verificar que los nuevos valores estén presentes
            if (!nuevo_id_doctor || !nuevo_id_especialidad) {
                res.status(400).json({ message: 'Datos incompletos' });
                return;
            }
    
            // Ejecutar la consulta de actualización
            await pool.query('UPDATE doctor_especialidad SET id_doctor = ?, id_especialidad = ? WHERE id_doctor = ? AND id_especialidad = ?', 
                             [nuevo_id_doctor, nuevo_id_especialidad, id_doctor, id_especialidad]);
    
            res.json({ message: 'Datos de la especialidad del doctor actualizados correctamente' });
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).send('Error al actualizar los datos del doctor');
        }
    }
    
    


public async getOne(req: Request, res: Response) {
    try {
        const { id_doctor, id_especialidad } = req.params;
        const result = await pool.query(
            `SELECT *
             FROM doctor_especialidad 
             WHERE id_doctor = ? AND id_especialidad = ?`,
            [id_doctor, id_especialidad]
        );
            res.json(result[0]); // Devolver el primer resultado
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Error al obtener los datos del doctor_especialidad');
    }
}
  }
  

export const doctor_especialidadControllers = new doctor_especialidadController ();
