// cita
export interface Cita {
  id_cita?: number;  // Opcional al crear, ya que es AUTO_INCREMENT
  id_paciente: number;
  id_doctor: number;
  nombre_especialidad: string;
  nombre_doc: string;
  nom_paciente: string;
  fecha: string;
  hora: string;      // Se recomienda manejar el tipo `string` para TIME
}

  
