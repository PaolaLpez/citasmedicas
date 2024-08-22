export interface Usuario {
    id_usuario?: number; // Opcional al crear, ya que es AUTO_INCREMENT
    id_rol: number;
    nombre: string;
    fecha_nac?: Date | null;  // Opcional para pacientes
    genero?: string | null;   // Opcional para pacientes
    direccion?: string | null; // Opcional para pacientes
    tipo_sangre?: string | null; // Opcional para pacientes
    curp?: string | null;        // Opcional para pacientes
    num_telefono?: string | null; // Opcional para pacientes
    id_especialidad?: number | null; // Opcional para doctores
    id_horario?: number | null;    // Opcional para doctores
    correo_electronico: string;
    contrasena: string;
  }
  