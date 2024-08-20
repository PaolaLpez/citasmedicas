// cita
export interface Cita {
    id_cita?: number;
    id_paciente: number;
    id_doctor: number;
    nombre_especialidad: string;
    nombre_doc: string;
    nombre_paciente?: string;
    fecha: Date;
    hora: Date;
  }
  
