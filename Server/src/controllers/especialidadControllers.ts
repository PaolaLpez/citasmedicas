import { Request, Response } from "express";
import pool from "../database";

class EspecialidadController {

public async list(req: Request, res: Response): Promise<void> {
    try {
        const result = await pool.query('select * from especialidad');
        res.json(result);
    } catch (error) {
        console.error('Database query error:', error); // Imprimir el error completo
        res.status(500).send('Error al consultar la base de datos');
      }
    }

    
    public async create(req: Request, res: Response): Promise<void> {
        try {
            // Asumir que req.body es un array de objetos y tomar el primer objeto
            const resultado = Array.isArray(req.body) ? req.body[0] : req.body;
    
            // Validar que todos los campos requeridos están presentes
            const { id_especialidad, nombre_especialidad } = resultado;
            if (!id_especialidad || !nombre_especialidad) {
                 res.status(400).json({ message: 'Datos incompletos' });
            }
    
            // Mostrar datos recibidos para depuración
            console.log('Received data:', resultado);
    
            // Ejecutar la consulta
            const result = await pool.query(
                'INSERT INTO especialidad (id_especialidad, nombre_especialidad) VALUES (?, ?)',
                [id_especialidad, nombre_especialidad]
            );
    
            res.status(201).json({ message: 'Datos de la especialidad insertados'});
        } catch (error) {
            console.error('Database query error:', error); // Imprimir el error completo
            if (!res.headersSent) {
                res.status(500).json({ message: 'Error al consultar la base de datos' });
            }
        }
    }  
public async delete(req: Request, res: Response): Promise<void> {
    try {
        const {id_especialidad } = req.params;
        await pool.query('DELETE FROM especialidad WHERE id_especialidad =?', [id_especialidad ])
        res.json({message : 'Datos de la especialidad eliminados'});
    } catch (error) {
          console.error('Database query error:', error); // Imprimir el error completo
          res.status(500).send('Error al eliminar los datos de la especialidad');
        }
    }
      
public async update(req: Request, res: Response): Promise<void> {
    try {
   
        const { id_especialidad, nombre_especialidad } = req.body

          // Verifica si todos los campos necesarios están presentes
          if (!id_especialidad || !nombre_especialidad) {
            res.status(400).json({ message: 'Datos incompletos' });
            return;
        }

        const result=await pool.query('UPDATE especialidad SET nombre_especialidad=? WHERE id_especialidad=?', [nombre_especialidad, id_especialidad])
             res.json({ message: 'Datos de la especialidad actualizados' });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Error al actualizar los datos de la especialidad');
      }
    }

public async getOne(req: Request, res: Response) {
    try {
        const {id_especialidad} = req.params;//Se recupera el id del params
        const result=await pool.query('SELECT * FROM especialidad WHERE id_especialidad=?', [id_especialidad])
        res.json(result);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Error la especialidad no existe');
      }
    }
  }
  

export const especialidadControllers = new EspecialidadController ();
