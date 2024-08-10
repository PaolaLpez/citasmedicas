import { Request, Response } from "express";
import pool from "../database";

class PacienteController {

public async list(req: Request, res: Response): Promise<void> {
    try {
        const paciente = await pool.query('select * from paciente');
        res.json(paciente);
    } catch (error) {
        console.error('Database query error:', error); // Imprimir el error completo
        res.status(500).send('Error al consultar la base de datos');
      }
    }

public async create(req: Request, res: Response): Promise<void> {
    try {
        await pool.query('INSERT INTO paciente set ?',[req.body]);
		res.json({message : 'Datos de inventario insertado'});
    } catch (error) {
          console.error('Database query error:', error); // Imprimir el error completo
          res.status(500).send('Error al consultar la base de datos');
        }
    }
  
public async delete(req: Request, res: Response): Promise<void> {
    try {
        const {id_paciente} = req.params;
        await pool.query('DELETE FROM paciente WHERE id_paciente =?', [id_paciente])
        res.json({message : 'Datos de paciente eliminados'});
    } catch (error) {
          console.error('Database query error:', error); // Imprimir el error completo
          res.status(500).send('Error al eliminar los datos del paciente');
        }
    }
      
public async update(req: Request, res: Response): Promise<void> {
    try {
        const {id_paciente} = req.params;
        await pool.query('UPDATE FROM paciente SET id_paciente =? WHERE id_paciente=?', [id_paciente])
        res.json({message : 'Datos del paciente actualizados'});
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Error al actualizar los datos del paciente');
      }
    }

public async getOne(req: Request, res: Response) {
    try {
        const {id_paciente} = req.params;//Se recupera el id del params
        const paciente=await pool.query('SELECT * FROM paciente WHERE id_paciente=?', [id_paciente])
        res.json(paciente);
            if(paciente.length > 0 ){
                return res.json(paciente[0]);
            }
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Error el paciente no existe');
      }
    }






  }
  

export const pacienteControllers = new PacienteController ();
