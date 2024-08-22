import { Request, Response } from "express";
import pool from "../database";

class UsuarioController {

    //METODOS PARA PACIENTE
public async listPaciente(req: Request, res: Response): Promise<void> {
    try {
        const paciente = await pool.query('select * from paciente');
        res.json(paciente);
    } catch (error) {
        console.error('Database query error:', error); // Imprimir el error completo
        res.status(500).send('Error al consultar la base de datos');
      }
    } 
    
    public async  registrarUsuario (req: Request, res: Response): Promise<void> {
        try {
            const { id_rol, nombre, fecha_nac, genero, direccion, tipo_sangre, curp, num_telefono, id_especialidad, id_horario, correo_electronico, contrasena } = req.body;
    
            // Aquí puedes agregar validaciones y encriptar la contraseña si es necesario
            await pool.query('INSERT INTO usuario SET ?', {
                id_rol,
                nombre,
                fecha_nac,
                genero,
                direccion,
                tipo_sangre,
                curp,
                num_telefono,
                id_especialidad,
                id_horario,
                correo_electronico,
                contrasena
            });
    
            res.status(201).json({ message: 'Usuario registrado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al registrar el usuario' });
        }
    };

public async  loginUsuario (req: Request, res: Response) : Promise<void> {
        try {
            const { correo_electronico, contrasena } = req.body;
            const result = await pool.query('SELECT * FROM usuario WHERE correo_electronico = ? AND contrasena = ?', [correo_electronico, contrasena]);
    
            if (result.length === 0) {
            res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
            }
    
            // Aquí puedes agregar lógica para generar y devolver un token de autenticación
            res.status(200).json({ message: 'Login exitoso', usuario: result[0] });
        } catch (error) {
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    };  

public async deletePaciente(req: Request, res: Response): Promise<void> {
    try {
        const {id_paciente} = req.params;
        await pool.query('DELETE FROM paciente WHERE id_paciente =?', [id_paciente])
        res.json({message : 'Datos de paciente eliminados'});
    } catch (error) {
          console.error('Database query error:', error); // Imprimir el error completo
          res.status(500).send('Error al eliminar los datos del paciente');
        }
    }
      
public async updatePaciente(req: Request, res: Response): Promise<void> {
    try {
        const {id_paciente} = req.params;
        const {nom_paciente, fecha_nac, genero, direccion, tipo_sangre, curp, num_telefono, correo_electronico, contrasena } = req.body;

        const result=await pool.query('UPDATE paciente SET nom_paciente =?, fecha_nac =?, genero =?, direccion =?, tipo_sangre =?, curp =?, num_telefono =?, correo_electronico =?, contrasena=? WHERE id_paciente=?', [nom_paciente, fecha_nac, genero, direccion, tipo_sangre, curp, num_telefono, correo_electronico,contrasena, id_paciente])
             res.json({ message: 'Datos del paciente actualizados' });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Error al actualizar los datos del paciente');
      }
    }

public async getOnePaciente(req: Request, res: Response) {
    try {
        const {id_paciente} = req.params;//Se recupera el id del params
        const paciente=await pool.query('SELECT * FROM paciente WHERE id_paciente=?', [id_paciente])
        res.json(paciente);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Error el paciente no existe');
      }
    }


    //METODOS PARA DOCTOR
    // Obtener doctores por especialidad
    public async getDoctoresByEspecialidad(req: Request, res: Response): Promise<void> {
        try {
            const { id_especialidad } = req.params;
            const result = await pool.query('SELECT * FROM doctor WHERE id_especialidad = ?', [id_especialidad]);
            if (Array.isArray(result) && result.length > 0) {
                res.json(result); // Devuelve todas las filas como un array
            } else {
                res.status(404).send('No se encontraron doctores para esta especialidad');
            }
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).send('Error al consultar los doctores');
        }
    }
    
    
        // Manejar la solicitud GET para listar todos los doctores
        public async listDoctor(req: Request, res: Response): Promise<void> {
            try {
                const [doctors] = await pool.query('SELECT * FROM doctor');
                res.json(doctors);
            } catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al consultar la base de datos');
            }
        }
    
        // Manejar la solicitud POST para crear un nuevo doctor (duplicado, por lo tanto, se recomienda eliminar o consolidar con addDoctor)
        public async createDoctor(req: Request, res: Response): Promise<void> {
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
                console.error('Database query error:', error);
                if (!res.headersSent) {
                    res.status(500).json({ message: 'Error al insertar en la base de datos' });
                }
            }
        }
    
        // Manejar la solicitud DELETE para eliminar un doctor
        public async deleteDoctor(req: Request, res: Response): Promise<void> {
            try {
                const { id_doctor } = req.params;
                const [result] = await pool.query('DELETE FROM doctor WHERE id_doctor = ?', [id_doctor]);
    
                if ((result as any).affectedRows === 0) {
                    res.status(404).send('Doctor no encontrado');
                } else {
                    res.json({ message: 'Doctor eliminado' });
                }
            } catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al eliminar el doctor');
            }
        }
    
        // Manejar la solicitud PUT para actualizar un doctor
        public async updateDoctor(req: Request, res: Response): Promise<void> {
            try {
                const { id_doctor } = req.params;
                const { usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor } = req.body;
    
                if (!usuario || !id_especialidad || !id_horario || !nombre_doc || !tipo_doctor) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
    
                const [result] = await pool.query(
                    'UPDATE doctor SET usuario = ?, id_especialidad = ?, id_horario = ?, nombre_doc = ?, tipo_doctor = ? WHERE id_doctor = ?',
                    [usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor, id_doctor]
                );
    
                if ((result as any).affectedRows === 0) {
                    res.status(404).send('Doctor no encontrado');
                } else {
                    res.json({ message: 'Doctor actualizado' });
                }
            } catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al actualizar el doctor');
            }
        }
    
        // Manejar la solicitud GET para obtener un doctor específico
        public async getOneDoctor(req: Request, res: Response): Promise<void> {
            try {
                const { id_doctor } = req.params;
                const [result] = await pool.query('SELECT * FROM doctor WHERE id_doctor = ?', [id_doctor]);
    
                if ((result as any).length === 0) {
                    res.status(404).send('Doctor no encontrado');
                } else {
                    res.json(result[0]);
                }
            } catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al consultar el doctor');
            }
        }

    
    //METODOS PARA ADMINISTRADOR
  // Método para crear un nuevo administrador
  public async createAdministrador(req: Request, res: Response): Promise<void> {
    try {
      const { usuario, id_doctor, nombre_adm } = req.body;
      if (!usuario || !id_doctor || !nombre_adm) {
        res.status(400).json({ message: 'Datos incompletos' });
        return;
      }

      // Verificar si el usuario ya existe en la tabla sesion
      const [usuarioExists]: any[] = await pool.query('SELECT * FROM sesion WHERE usuario = ?', [usuario]);
      if (Array.isArray(usuarioExists) && usuarioExists.length === 0) {
        res.status(400).json({ message: 'El usuario no existe en la tabla sesion' });
        return;
      }

      // Verificar si el id_doctor existe en la tabla doctor
      const [doctorExists]: any[] = await pool.query('SELECT * FROM doctor WHERE id_doctor = ?', [id_doctor]);
      if (Array.isArray(doctorExists) && doctorExists.length === 0) {
        res.status(400).json({ message: 'El ID de doctor no existe' });
        return;
      }

      // Insertar nuevo administrador
      await pool.query(
        'INSERT INTO administrador (usuario, id_doctor, nombre_adm) VALUES (?, ?, ?)',
        [usuario, id_doctor, nombre_adm]
      );
      res.status(201).json({ message: 'Administrador creado con éxito' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ message: 'Error al crear administrador' });
    }
  }

  // Método para listar todos los administradores
  public async listAdministrador(req: Request, res: Response): Promise<void> {
    try {
      const [admins]: any[] = await pool.query('SELECT * FROM administrador');
      res.json(admins);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ message: 'Error al consultar administradores' });
    }
  }

  // Método para obtener un administrador por ID
  public async getOneAdministrador(req: Request, res: Response): Promise<void> {
    try {
      const { id_administrador } = req.params;
      const [result]: any[] = await pool.query('SELECT * FROM administrador WHERE id_administrador = ?', [id_administrador]);
      if (Array.isArray(result) && result.length === 0) {
        res.status(404).json({ message: 'Administrador no encontrado' });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ message: 'Error al obtener administrador' });
    }
  }

  // Método para actualizar un administrador existente
  public async updateAdministrador(req: Request, res: Response): Promise<void> {
    try {
      const { id_administrador } = req.params;
      const { usuario, id_doctor, nombre_adm } = req.body;
      if (!usuario || !id_doctor || !nombre_adm) {
        res.status(400).json({ message: 'Datos incompletos' });
        return;
      }

      // Verificar si el id_administrador existe
      const [adminExists]: any[] = await pool.query('SELECT * FROM administrador WHERE id_administrador = ?', [id_administrador]);
      if (Array.isArray(adminExists) && adminExists.length === 0) {
        res.status(404).json({ message: 'Administrador no encontrado' });
        return;
      }

      // Verificar si el usuario existe en la tabla sesion
      const [usuarioExists]: any[] = await pool.query('SELECT * FROM sesion WHERE usuario = ?', [usuario]);
      if (Array.isArray(usuarioExists) && usuarioExists.length === 0) {
        res.status(400).json({ message: 'El usuario no existe en la tabla sesion' });
        return;
      }

      // Verificar si el id_doctor existe en la tabla doctor
      const [doctorExists]: any[] = await pool.query('SELECT * FROM doctor WHERE id_doctor = ?', [id_doctor]);
      if (Array.isArray(doctorExists) && doctorExists.length === 0) {
        res.status(400).json({ message: 'El ID de doctor no existe' });
        return;
      }

      // Actualizar administrador
      await pool.query(
        'UPDATE administrador SET usuario = ?, id_doctor = ?, nombre_adm = ? WHERE id_administrador = ?',
        [usuario, id_doctor, nombre_adm, id_administrador]
      );
      res.json({ message: 'Administrador actualizado con éxito' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ message: 'Error al actualizar administrador' });
    }
  }

  // Método para eliminar un administrador existente
  public async deleteAdministrador(req: Request, res: Response): Promise<void> {
    try {
      const { id_administrador } = req.params;
      // Verificar si el id_administrador existe
      const [adminExists]: any[] = await pool.query('SELECT * FROM administrador WHERE id_administrador = ?', [id_administrador]);
      if (Array.isArray(adminExists) && adminExists.length === 0) {
        res.status(404).json({ message: 'Administrador no encontrado' });
        return;
      }

      // Eliminar administrador
      await pool.query('DELETE FROM administrador WHERE id_administrador = ?', [id_administrador]);
      res.json({ message: 'Administrador eliminado con éxito' });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ message: 'Error al eliminar administrador' });
    }
  }
}
  

export const usuarioControllers = new UsuarioController ();
