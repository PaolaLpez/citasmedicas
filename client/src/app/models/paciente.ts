//Paciente
export interface Paciente {
    id_paciente?:number;
    id_rol?: 3;
    nom_paciente: string;
    fecha_nac: Date | null;
    genero: string;
    direccion: string;
    tipo_sangre: string;
    curp: string;
    num_telefono: string;
    correo_electronico: string;
    contrasena: string;
  }
