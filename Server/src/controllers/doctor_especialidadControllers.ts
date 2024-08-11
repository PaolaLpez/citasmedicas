import { Request, Response } from "express";
import pool from "../database";

class doctor_especialidadController {

public async list(req: Request, res: Response): Promise<void> {
    try {
        const doctor_especialidad = await pool.query('select * doctor_especialidad');
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
                'INSERT INTO paciente (id_especialidad, id_doctor) VALUES (?, ?)',
                [id_especialidad, id_doctor]
            );
    
            res.status(201).json({ message: 'Datos de paciente insertados'});
        } catch (error) {
            console.error('Database query error:', error); // Imprimir el error completo
            if (!res.headersSent) {
                res.status(500).json({ message: 'Error al consultar la base de datos' });
            }
        }
    }  
public async delete(req: Request, res: Response): Promise<void> {
    try {
        const {id_especialidad} = req.params;
        await pool.query('DELETE FROM id_especialidad WHERE id_especialidad, id_doctor =?', [id_especialidad])
        res.json({message : 'Datos de paciente eliminados'});
    } catch (error) {
          console.error('Database query error:', error); // Imprimir el error completo
          res.status(500).send('Error al eliminar los datos del paciente');
        }
    }
      
public async update(req: Request, res: Response): Promise<void> {
    try {
        const {id_especialidad} = req.params;
        const {id_especialidad1, id_doctor } = req.body;

        const result=await pool.query('UPDATE doctor_especialidad SET id_especialidad1=?, id_doctor=? WHERE id_especialidad=?', [id_especialidad1, id_doctor])
             res.json({ message: 'Datos del paciente actualizados' });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Error al actualizar los datos del paciente');
      }
    }

public async getOne(req: Request, res: Response) {
    try {
        const {id_especialidad} = req.params;//Se recupera el id del params
        const paciente=await pool.query('SELECT * FROM doctor_especialidad WHERE id_especialidad=?', [id_especialidad])
        res.json(paciente);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Error el paciente no existe');
      }
    }
  }
  

export const doctor_especialidadControllers = new doctor_especialidadController ();
