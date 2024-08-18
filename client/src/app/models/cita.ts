// cita
export interface Cita {
    id_cita?: number;
    id_paciente: number;
    id_doctor: number;
    fecha: Date;
    hora: Date;
    stado?: string;
  }
  
