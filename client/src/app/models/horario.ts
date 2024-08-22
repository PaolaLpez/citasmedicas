//horario
export interface Horario {
    id_horario: number;
    hora_inicio: string;  // Se recomienda manejar el tipo `string` para TIME
    hora_fin: string;     // Se recomienda manejar el tipo `string` para TIME
    fecha_inicio: Date;
    fecha_fin: Date;
  }
  