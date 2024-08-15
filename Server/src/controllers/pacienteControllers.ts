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
            // Asumir que req.body es un array de objetos y tomar el primer objeto
            const paciente = Array.isArray(req.body) ? req.body[0] : req.body;
    
            // Validar que todos los campos requeridos están presentes
            const { usuario, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, curp, num_telefono, correo_electronico } = paciente;
            if (!usuario || !nom_paciente || !fecha_nac || !genero || !direccion || !tipo_sangre || !curp || !num_telefono || !correo_electronico) {
                 res.status(400).json({ message: 'Datos incompletos' });
            }
    
            // Mostrar datos recibidos para depuración
            console.log('Received data:', paciente);
    
            // Ejecutar la consulta
            const result = await pool.query(
                'INSERT INTO paciente (usuario, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, curp, num_telefono, correo_electronico) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [usuario, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, curp, num_telefono, correo_electronico]
            );
    
            res.status(201).json({ message: 'Datos de paciente insertados', id_paciente: result.insertId });
        } catch (error) {
            console.error('Database query error:', error); // Imprimir el error completo
            if (!res.headersSent) {
                res.status(500).json({ message: 'Error al consultar la base de datos' });
            }
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
        const { usuario, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, curp, num_telefono, correo_electronico } = req.body;

        const result=await pool.query('UPDATE paciente SET usuario =?, nom_paciente =?, fecha_nac =?, genero =?, direccion =?, tipo_sangre =?, curp =?, num_telefono =?, correo_electronico =? WHERE id_paciente=?', [usuario, nom_paciente, fecha_nac, genero, direccion, tipo_sangre, curp, num_telefono, correo_electronico, id_paciente])
             res.json({ message: 'Datos del paciente actualizados' });
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
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Error el paciente no existe');
      }
    }
  }
  

export const pacienteControllers = new PacienteController ();
